'use client';

import AuthProvider from '../components/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}