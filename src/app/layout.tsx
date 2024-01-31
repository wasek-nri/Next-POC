// 'use client';

// import ResponsiveAppBar from "../common/ui/components/Header";
// import { ThemeProvider } from '../common/ui/mui/MuiThemeProvider.client';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//       <ThemeProvider>
//       <ResponsiveAppBar />
//       <main>{children}</main>
//     </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Header from "../common/ui/components/Header";
import { ThemeProvider } from '../common/ui/mui/MuiThemeProvider.client';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header />
            <main>
                {props.children}
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}