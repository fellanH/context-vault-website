import { createBrowserRouter } from "react-router";
import { MarketingLayout } from "./components/MarketingLayout";
import { LandingPage } from "./pages/LandingPage";
import { GetStartedPage } from "./pages/GetStartedPage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { SupportPage } from "./pages/SupportPage";
import { TermsPage } from "./pages/TermsPage";
import { SectionsPage } from "./pages/SectionsPage";

// Admin routes — only registered in dev; entire branch tree-shaken in prod
const adminRoutes = import.meta.env.DEV
  ? [
      {
        path: "admin",
        lazy: () =>
          import("./pages/admin/AdminLayout").then((m) => ({
            Component: m.AdminLayout,
          })),
        children: [
          {
            index: true,
            lazy: () =>
              import("./pages/admin/DashboardPage").then((m) => ({
                Component: m.DashboardPage,
              })),
          },
          {
            path: "posts",
            lazy: () =>
              import("./pages/admin/PostsListPage").then((m) => ({
                Component: m.PostsListPage,
              })),
          },
          {
            path: "posts/new",
            lazy: () =>
              import("./pages/admin/PostEditorPage").then((m) => ({
                Component: m.PostEditorPage,
              })),
          },
          {
            path: "posts/:slug",
            lazy: () =>
              import("./pages/admin/PostEditorPage").then((m) => ({
                Component: m.PostEditorPage,
              })),
          },
          {
            path: "copy",
            lazy: () =>
              import("./pages/admin/CopyEditorPage").then((m) => ({
                Component: m.CopyEditorPage,
              })),
          },
          {
            path: "images",
            lazy: () =>
              import("./pages/admin/ImagesPage").then((m) => ({
                Component: m.ImagesPage,
              })),
          },
        ],
      },
    ]
  : [];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "get-started", Component: GetStartedPage },
      { path: "blog", Component: BlogIndexPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "terms", Component: TermsPage },
      { path: "support", Component: SupportPage },
      { path: "sections", Component: SectionsPage },
    ],
  },
  ...adminRoutes,
]);
