import { createBrowserRouter } from 'react-router';
import { routes } from './route-config';

// Admin routes -- only registered in dev; entire branch tree-shaken in prod
const adminRoutes = import.meta.env.DEV
  ? [
      {
        path: 'admin',
        lazy: () =>
          import('./pages/admin/AdminLayout').then((m) => ({
            Component: m.AdminLayout,
          })),
        children: [
          {
            index: true,
            lazy: () =>
              import('./pages/admin/DashboardPage').then((m) => ({
                Component: m.DashboardPage,
              })),
          },
          {
            path: 'posts',
            lazy: () =>
              import('./pages/admin/PostsListPage').then((m) => ({
                Component: m.PostsListPage,
              })),
          },
          {
            path: 'posts/new',
            lazy: () =>
              import('./pages/admin/PostEditorPage').then((m) => ({
                Component: m.PostEditorPage,
              })),
          },
          {
            path: 'posts/:slug',
            lazy: () =>
              import('./pages/admin/PostEditorPage').then((m) => ({
                Component: m.PostEditorPage,
              })),
          },
          {
            path: 'copy',
            lazy: () =>
              import('./pages/admin/CopyEditorPage').then((m) => ({
                Component: m.CopyEditorPage,
              })),
          },
          {
            path: 'images',
            lazy: () =>
              import('./pages/admin/ImagesPage').then((m) => ({
                Component: m.ImagesPage,
              })),
          },
          {
            path: 'patterns',
            lazy: () =>
              import('./pages/admin/PatternDemoPage').then((m) => ({
                Component: m.PatternDemoPage,
              })),
          },
        ],
      },
    ]
  : [];

export const router = createBrowserRouter([...routes, ...adminRoutes]);
