import "./globals.css";

export const metadata = {
  title: "What's Your Mood Today",
  description: "情緒宇宙",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
