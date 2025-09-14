import * as React from "react";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const value = React.useMemo(
    () => ({ open, setOpen, collapsed, setCollapsed }),
    [open, collapsed]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
}

export function Sidebar({
  className,
  children,
}: React.HTMLAttributes<HTMLElement>) {
  const { collapsed } = useSidebar();
  return (
    <aside
      data-collapsed={collapsed || undefined}
      className={cn(
        "hidden md:flex md:flex-col md:border-r md:bg-slate-50 md:text-slate-900 dark:md:bg-slate-900 dark:md:text-slate-100 dark:md:border-slate-800",
        "md:sticky md:top-0 md:h-screen md:shrink-0",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "md:w-16" : "md:w-60",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", props.className)} {...props} />;
}
export function SidebarFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto p-4", props.className)} {...props} />;
}
export function SidebarContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-2", props.className)}
      {...props}
    />
  );
}
export function SidebarGroup(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2", props.className)} {...props} />;
}
export function SidebarGroupLabel(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2 pb-1 text-xs font-medium uppercase tracking-wide text-slate-500",
        props.className
      )}
      {...props}
    />
  );
}
export function SidebarGroupContent(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return <div className={cn("space-y-1", props.className)} {...props} />;
}
export function SidebarMenu(props: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("flex flex-col gap-1", props.className)} {...props} />
  );
}
export function SidebarMenuItem(props: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}
export function SidebarMenuButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
        "data-[active=true]:bg-slate-100 data-[active=true]:font-medium dark:data-[active=true]:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // Adds left padding matching sidebar width on md+
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "min-h-screen w-full",
        "md:pl-60 data-[collapsed=true]:md:pl-16 transition-[padding] duration-200",
        className
      )}
      data-collapsed={collapsed || undefined}
      {...props}
    />
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, collapsed, setCollapsed } = useSidebar();
  return (
    <button
      aria-label="Toggle sidebar"
      onClick={(e) => {
        props.onClick?.(e);
        if (window.matchMedia("(min-width: 768px)").matches) {
          setCollapsed(!collapsed);
        } else {
          setOpen(!open);
        }
      }}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800",
        className
      )}
    >
      {props.children}
    </button>
  );
}

// Mobile overlay drawer
export function SidebarDrawer({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebar();
  const [render, setRender] = React.useState(open);

  React.useEffect(() => {
    if (open) {
      setRender(true);
      return;
    }
    const id = window.setTimeout(() => setRender(false), 220); // keep mounted during exit
    return () => window.clearTimeout(id);
  }, [open]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal>
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-200 ease-in-out motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-72 bg-white shadow-lg transition-transform duration-200 ease-in-out will-change-transform motion-reduce:transition-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}
