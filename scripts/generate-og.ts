import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'fs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const posts = JSON.parse(
  readFileSync(join(__dirname, '../src/app/content/posts.json'), 'utf-8')
) as Array<{ slug: string; title: string; category: string }>;

type FontInput = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: 'normal';
};

function loadFonts(): FontInput[] {
  const fontsDir = join(__dirname, '../node_modules/@fontsource/inter/files');
  return [
    {
      name: 'Inter',
      data: readFileSync(join(fontsDir, 'inter-latin-400-normal.woff')).buffer,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: readFileSync(join(fontsDir, 'inter-latin-600-normal.woff')).buffer,
      weight: 600,
      style: 'normal',
    },
  ];
}

async function renderPng(element: object, fonts: FontInput[]): Promise<Buffer> {
  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
  });
  return Buffer.from(new Resvg(svg).render().asPng());
}

function defaultCard() {
  return {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        padding: '72px 80px',
        backgroundColor: '#212121',
        backgroundImage: 'radial-gradient(circle, #3a3a3a 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '32px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '12px',
                    height: '40px',
                    backgroundColor: '#6d28d9',
                    borderRadius: '3px',
                  },
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '48px',
                    fontWeight: 600,
                    color: '#f8f8f8',
                    letterSpacing: '-1px',
                  },
                  children: 'Context Vault',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '28px',
              fontWeight: 400,
              color: '#6d28d9',
              marginBottom: '24px',
              letterSpacing: '-0.3px',
            },
            children: 'Persistent Memory for AI Agents',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '18px',
              color: '#a3a3a3',
            },
            children: 'context-vault.com',
          },
        },
      ],
    },
  };
}

function blogCard(title: string, category: string) {
  return {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        padding: '64px 80px',
        backgroundColor: '#212121',
        backgroundImage: 'radial-gradient(circle, #3a3a3a 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '24px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignSelf: 'flex-start',
                    backgroundColor: '#6d28d9',
                    color: '#f8f8f8',
                    fontSize: '14px',
                    fontWeight: 600,
                    padding: '6px 16px',
                    borderRadius: '20px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase' as const,
                  },
                  children: category,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '42px',
                    fontWeight: 600,
                    color: '#f8f8f8',
                    lineHeight: '1.2',
                    letterSpacing: '-0.5px',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: '960px',
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '8px',
                    height: '28px',
                    backgroundColor: '#6d28d9',
                    borderRadius: '2px',
                  },
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#f8f8f8',
                  },
                  children: 'Context Vault',
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '20px',
                    color: '#a3a3a3',
                  },
                  children: '·',
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '20px',
                    color: '#a3a3a3',
                  },
                  children: 'context-vault.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  mkdirSync('public/og', { recursive: true });
  const fonts = loadFonts();

  writeFileSync('public/og/default.png', await renderPng(defaultCard(), fonts));
  console.log('Generated public/og/default.png');

  for (const post of posts) {
    const buf = await renderPng(blogCard(post.title, post.category), fonts);
    writeFileSync(`public/og/blog-${post.slug}.png`, buf);
    console.log(`Generated public/og/blog-${post.slug}.png`);
  }

  console.log(`\nDone: generated ${posts.length + 1} OG images`);
}

main();
