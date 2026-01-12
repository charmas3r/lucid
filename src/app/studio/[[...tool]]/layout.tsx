export const metadata = {
  title: 'Lucid CMS Studio',
  description: 'Content management for Lucid Web Studio',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
