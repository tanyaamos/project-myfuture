import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Matrix | Project MyFuture",
  description: "Review and edit all copy for the Project MyFuture experience.",
  robots: { index: false, follow: false },
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#1a1a1a]">{children}</div>
  );
}
