import "./globals.css";


export const metadata = {
  title: "Muhammed Nihal KP | Portfolio",
  description: "AI/ML Developer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
