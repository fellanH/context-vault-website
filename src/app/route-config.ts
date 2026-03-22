import type { RouteObject } from 'react-router';
import { MarketingLayout } from './components/MarketingLayout';
import { LandingPage } from './pages/LandingPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SupportPage } from './pages/SupportPage';
import { TermsPage } from './pages/TermsPage';
import { SectionsPage } from './pages/SectionsPage';
import { PricingPage } from './pages/PricingPage';
import { DocsIndexPage } from './pages/DocsIndexPage';
import { DocsSetupPage } from './pages/DocsSetupPage';
import { AgentRulesPage } from './pages/AgentRulesPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: MarketingLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'get-started', Component: GetStartedPage },
      { path: 'blog', Component: BlogIndexPage },
      { path: 'blog/:slug', Component: BlogPostPage },
      { path: 'privacy', Component: PrivacyPage },
      { path: 'terms', Component: TermsPage },
      { path: 'support', Component: SupportPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'sections', Component: SectionsPage },
      { path: 'docs', Component: DocsIndexPage },
      { path: 'docs/setup', Component: DocsSetupPage },
      { path: 'docs/agent-rules', Component: AgentRulesPage },
    ],
  },
];
