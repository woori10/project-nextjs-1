"use client";

import AppBar from "@/components/layout/appbar";
import Sidebar from "@/components/layout/sidebar";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <AppBar onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 px-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
