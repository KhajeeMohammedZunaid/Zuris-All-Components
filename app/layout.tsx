import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-display',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Nexura - Scale faster with your AI Agent",
  description:
    "Spend less time on logistics and more on strategy while Nexura handles the execution of your global marketing operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, plusJakartaSans.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-sans m-0 p-0 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
