"use client";

import AppBar from "@/components/layout/appbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <AppBar />

        {/* ⬇️ main NGISI SISA TINGGI */}
        <main className="flex-1 pt-14 px-4 sm:px-6 lg:px-10 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

