import { Link, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, NotebookPen, FolderKanban } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Item({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <NavLink to={to} className={() => "block"}>
      {({ isActive }) => (
        <SidebarMenuButton data-active={isActive}>
          <Icon className="h-4 w-4" />
          <span className="truncate">{children}</span>
        </SidebarMenuButton>
      )}
    </NavLink>
  );
}

function SidebarPane({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <SidebarHeader>
        <Link to="/" className="block">
          <div className="flex items-center gap-3 px-2">
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/3921357?v=4"
                alt="Kim Lam"
              />
              <AvatarFallback>KL</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">Kim Lam</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/" onClick={onNavigate} className={() => "block"}>
                  {({ isActive }) => (
                    <SidebarMenuButton data-active={isActive}>
                      <Home className="h-4 w-4" />
                      <span className="truncate">Home</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink
                  to="/writings"
                  onClick={onNavigate}
                  className={() => "block"}
                >
                  {({ isActive }) => (
                    <SidebarMenuButton data-active={isActive}>
                      <NotebookPen className="h-4 w-4" />
                      <span className="truncate">Writings</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink
                  to="/projects"
                  onClick={onNavigate}
                  className={() => "block"}
                >
                  {({ isActive }) => (
                    <SidebarMenuButton data-active={isActive}>
                      <FolderKanban className="h-4 w-4" />
                      <span className="truncate">Projects</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 text-xs text-slate-500">
          © {new Date().getFullYear()} knlam
        </div>
      </SidebarFooter>
    </>
  );
}

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarPane />
    </Sidebar>
  );
}

export function MobileSidebar() {
  const { setOpen } = useSidebar();
  return (
    <div className="h-full overflow-y-auto">
      <SidebarPane onNavigate={() => setOpen(false)} />
    </div>
  );
}
