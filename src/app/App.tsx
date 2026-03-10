import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
