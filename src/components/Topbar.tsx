import Breadcrumbs from "@/components/Breadcrumbs";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function Topbar({ onMenu }: { onMenu?: () => void }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-14 max-w-3xl items-center justify-between px-4 md:px-8">
        <div className="-ml-2 md:hidden">
          <SidebarTrigger onClick={onMenu as any}>
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </div>
        <div className="flex-1 md:ml-0">
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
