/**
 * configure-gtm.ts — One-shot GTM setup script
 *
 * Creates all tags, triggers, and variables in your GTM container, then
 * publishes. Run once after creating your analytics accounts.
 *
 * Prerequisites:
 *   1. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
 *   2. Authenticate: gcloud auth application-default login
 *   3. Fill in the CONFIGURATION constants below
 *   4. Run: npx tsx scripts/configure-gtm.ts
 */

import { google } from 'googleapis';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// All IDs below are available from their respective dashboards. None of these
// are secrets — they are client-side IDs visible in page source.

/** Numeric account ID — from GTM URL: tagmanager.google.com/#/account/{ID}/... */
const GTM_ACCOUNT_ID = 'TODO_NUMERIC_ACCOUNT_ID';

/** Numeric container ID — from GTM URL: .../containers/{ID}/workspaces/... */
const GTM_CONTAINER_NUMERIC_ID = 'TODO_NUMERIC_CONTAINER_ID';

/** GA4 Measurement ID — GA4 → Admin → Data Streams → your stream → Measurement ID */
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/** Microsoft Clarity Project ID — Clarity → Settings → Setup (8-char alphanumeric) */
const CLARITY_PROJECT_ID = 'TODO_CLARITY_ID';

/** PostHog API key — PostHog → Project Settings → Project API Key */
const POSTHOG_API_KEY = 'phc_TODO';

/** PostHog ingest host — us.i.posthog.com or eu.i.posthog.com */
const POSTHOG_HOST = 'https://us.i.posthog.com';
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/tagmanager.edit.containers',
      'https://www.googleapis.com/auth/tagmanager.publish',
    ],
  });

  const gtm = google.tagmanager({ version: 'v2', auth });
  const containerParent = `accounts/${GTM_ACCOUNT_ID}/containers/${GTM_CONTAINER_NUMERIC_ID}`;

  // ── 1. Find default workspace ─────────────────────────────────────────────
  const wsListRes = await gtm.accounts.containers.workspaces.list({
    parent: containerParent,
  });
  const workspace = wsListRes.data.workspace?.find((w) => w.name === 'Default Workspace');
  if (!workspace?.path) {
    throw new Error(
      'Default Workspace not found. Check GTM_ACCOUNT_ID and GTM_CONTAINER_NUMERIC_ID.'
    );
  }
  const wp = workspace.path;
  console.log(`Using workspace: ${workspace.name} (${wp})`);

  // ── 2. Enable built-in variables ──────────────────────────────────────────
  await gtm.accounts.containers.workspaces.built_in_variables.create({
    parent: wp,
    type: ['PAGE_URL', 'PAGE_PATH', 'CLICK_ELEMENT', 'CLICK_TEXT', 'CLICK_URL', 'HISTORY_SOURCE'],
  });
  console.log('Built-in variables enabled');

  // ── 3. Triggers ───────────────────────────────────────────────────────────

  const allPagesRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: { name: 'All Pages', type: 'pageview' },
  });
  const allPagesId = allPagesRes.data.triggerId!;
  console.log(`Trigger created: All Pages (${allPagesId})`);

  const historyChangeRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: { name: 'History Change', type: 'historyChange' },
  });
  const historyChangeId = historyChangeRes.data.triggerId!;
  console.log(`Trigger created: History Change (${historyChangeId})`);

  // History Change filtered to /blog/* paths — used for blog_post_view event
  const historyBlogRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: {
      name: 'History Change — Blog',
      type: 'historyChange',
      filter: [
        {
          type: 'matchRegex',
          parameter: [
            { type: 'template', key: 'arg0', value: '{{Page Path}}' },
            { type: 'template', key: 'arg1', value: '^/blog/' },
          ],
        },
      ],
    },
  });
  const historyBlogId = historyBlogRes.data.triggerId!;
  console.log(`Trigger created: History Change — Blog (${historyBlogId})`);

  // History Change filtered to /get-started — used for get_started_view event
  const historyGetStartedRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: {
      name: 'History Change — Get Started',
      type: 'historyChange',
      filter: [
        {
          type: 'equals',
          parameter: [
            { type: 'template', key: 'arg0', value: '{{Page Path}}' },
            { type: 'template', key: 'arg1', value: '/get-started' },
          ],
        },
      ],
    },
  });
  const historyGetStartedId = historyGetStartedRes.data.triggerId!;
  console.log(`Trigger created: History Change — Get Started (${historyGetStartedId})`);

  // Clicks on register links or CTA buttons with matching text
  const ctaClickRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: {
      name: 'CTA Click',
      type: 'click',
      filter: [
        {
          type: 'cssSelector',
          parameter: [
            { type: 'template', key: 'arg0', value: '{{Click Element}}' },
            {
              type: 'template',
              key: 'arg1',
              value: 'a[href*="/register"], button',
            },
          ],
        },
        {
          type: 'matchRegex',
          parameter: [
            { type: 'template', key: 'arg0', value: '{{Click Text}}' },
            {
              type: 'template',
              key: 'arg1',
              value: 'Start free|Register|Install now|Sign up',
            },
          ],
        },
      ],
    },
  });
  const ctaClickId = ctaClickRes.data.triggerId!;
  console.log(`Trigger created: CTA Click (${ctaClickId})`);

  // All link clicks where the destination is NOT context-vault.com
  const outboundClickRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: {
      name: 'Outbound Click',
      type: 'linkClick',
      checkValidation: true,
      filter: [
        {
          type: 'contains',
          parameter: [
            { type: 'template', key: 'arg0', value: '{{Click URL}}' },
            { type: 'template', key: 'arg1', value: 'context-vault.com' },
            // negate: true means this condition must NOT match
            { type: 'boolean', key: 'negate', value: 'true' },
          ],
        },
      ],
    },
  });
  const outboundClickId = outboundClickRes.data.triggerId!;
  console.log(`Trigger created: Outbound Click (${outboundClickId})`);

  // Custom event pushed by GetStartedPage copyCommand handler
  const copyCommandRes = await gtm.accounts.containers.workspaces.triggers.create({
    parent: wp,
    requestBody: {
      name: 'Copy Command',
      type: 'customEvent',
      customEventFilter: [
        {
          type: 'equals',
          parameter: [
            { type: 'template', key: 'arg0', value: '{{_event}}' },
            { type: 'template', key: 'arg1', value: 'copy_command' },
          ],
        },
      ],
    },
  });
  const copyCommandId = copyCommandRes.data.triggerId!;
  console.log(`Trigger created: Copy Command (${copyCommandId})`);

  // ── 4. Tags ───────────────────────────────────────────────────────────────

  // GA4 Configuration — fires on every page (initial load + SPA navigation)
  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'GA4 Configuration',
      type: 'gaawc',
      parameter: [{ type: 'template', key: 'measurementId', value: GA4_MEASUREMENT_ID }],
      firingTriggerId: [allPagesId, historyChangeId],
    },
  });
  console.log('Tag created: GA4 Configuration');

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'GA4 Event — cta_click',
      type: 'gaawe',
      parameter: [
        { type: 'template', key: 'eventName', value: 'cta_click' },
        { type: 'template', key: 'measurementId', value: GA4_MEASUREMENT_ID },
      ],
      firingTriggerId: [ctaClickId],
    },
  });
  console.log('Tag created: GA4 Event — cta_click');

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'GA4 Event — blog_post_view',
      type: 'gaawe',
      parameter: [
        { type: 'template', key: 'eventName', value: 'blog_post_view' },
        { type: 'template', key: 'measurementId', value: GA4_MEASUREMENT_ID },
      ],
      firingTriggerId: [historyBlogId],
    },
  });
  console.log('Tag created: GA4 Event — blog_post_view');

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'GA4 Event — get_started_view',
      type: 'gaawe',
      parameter: [
        { type: 'template', key: 'eventName', value: 'get_started_view' },
        { type: 'template', key: 'measurementId', value: GA4_MEASUREMENT_ID },
      ],
      firingTriggerId: [historyGetStartedId],
    },
  });
  console.log('Tag created: GA4 Event — get_started_view');

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'GA4 Event — outbound_click',
      type: 'gaawe',
      parameter: [
        { type: 'template', key: 'eventName', value: 'outbound_click' },
        { type: 'template', key: 'measurementId', value: GA4_MEASUREMENT_ID },
      ],
      firingTriggerId: [outboundClickId],
    },
  });
  console.log('Tag created: GA4 Event — outbound_click');

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'GA4 Event — copy_command',
      type: 'gaawe',
      parameter: [
        { type: 'template', key: 'eventName', value: 'copy_command' },
        { type: 'template', key: 'measurementId', value: GA4_MEASUREMENT_ID },
      ],
      firingTriggerId: [copyCommandId],
    },
  });
  console.log('Tag created: GA4 Event — copy_command');

  // Microsoft Clarity
  const clarityHtml = `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
<\/script>`;

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'Microsoft Clarity',
      type: 'html',
      parameter: [
        { type: 'template', key: 'html', value: clarityHtml },
        { type: 'boolean', key: 'supportDocumentWrite', value: 'false' },
      ],
      firingTriggerId: [allPagesId],
    },
  });
  console.log('Tag created: Microsoft Clarity');

  // PostHog
  const posthogHtml = `<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a=u._i.push([i,[s,a]]),u.POSTHOG_KEY=i,u.config=s,u});posthog._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('${POSTHOG_API_KEY}', {api_host: '${POSTHOG_HOST}', person_profiles: 'identified_only'});
<\/script>`;

  await gtm.accounts.containers.workspaces.tags.create({
    parent: wp,
    requestBody: {
      name: 'PostHog',
      type: 'html',
      parameter: [
        { type: 'template', key: 'html', value: posthogHtml },
        { type: 'boolean', key: 'supportDocumentWrite', value: 'false' },
      ],
      firingTriggerId: [allPagesId, historyChangeId],
    },
  });
  console.log('Tag created: PostHog');

  // ── 5. Create version and publish ─────────────────────────────────────────
  console.log('\nCreating container version...');
  const versionRes = await gtm.accounts.containers.workspaces.create_version({
    path: wp,
    requestBody: {
      name: 'analytics-setup v1',
      notes:
        'Initial analytics stack configured programmatically: GA4 configuration + events, Microsoft Clarity, PostHog.',
    },
  });

  const versionPath = versionRes.data.containerVersion?.path;
  if (!versionPath) throw new Error('Failed to create container version');
  console.log(`Version created: ${versionPath}`);

  await gtm.accounts.containers.versions.publish({ path: versionPath });
  console.log('\nSuccess — GTM container configured and published.');
  console.log('Open GTM Preview mode to verify tags fire on navigation and clicks.');
}

main().catch((err) => {
  console.error('Error:', err?.message ?? err);
  process.exit(1);
});
