export const metadata = {
  title: 'Fun4Me Store',
  description: 'Tu tienda online en Paraguay',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
