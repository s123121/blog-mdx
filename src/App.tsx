import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Writings from "./pages/Writings";
import Writing from "./pages/Writing";
import AppSidebar, { MobileSidebar } from "@/components/AppSidebar";
import {
  SidebarDrawer,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function App() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <div className="flex">
          {/* Desktop sidebar */}
          <AppSidebar />

          {/* Content area */}
          <SidebarInset>
            <Topbar />
            <main className="p-4 md:p-8">
              <div className="max-w-3xl">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/writings" element={<Writings />} />
                  <Route path="/writings/:slug" element={<Writing />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>

      {/* Mobile sidebar drawer using the provider state */}
      <SidebarDrawer>
        <MobileSidebar />
      </SidebarDrawer>
    </SidebarProvider>
  );
}
