"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars,
  Bell,
  Gear,
  House,
  Magnifier,
  Person,
  Book,
  Pencil,
  ShieldCheck,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import { useState, useEffect } from "react";

export function Dashboradlayout({ children }) {
  const pathname = usePathname();
  const [userinfo, setUserinfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userdata();
        setUserinfo(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // NAV ITEMS
  const readerNav = [
    { icon: House, label: "Overview", href: "/Dashboard/reader" },
    { icon: Book, label: "Purchased Ebooks", href: "/Dashboard/reader/my-libarey" },
    { icon: Magnifier, label: "Purchase History", href: "/Dashboard/reader/historyboks" },
    { icon: Bell, label: "Bookmark", href: "/Dashboard/reader/Bookmark" },
    { icon: Person, label: "Profile", href: "/Dashboard/reader/userprofile" },
  ];

  const writerNav = [
    { icon: House, label: "Overview", href: "/Dashboard/writer" },
    { icon: Pencil, label: "My Books", href: "/Dashboard/writer/my-book" },
    { icon: Book, label: "Add Ebook", href: "/Dashboard/writer/Createbook" },
    { icon: Bell, label: "Sales History", href: "/Dashboard/writer/sales-history" },
    { icon: Person, label: "Bookmark", href: "/Dashboard/writer/Bookmark" },
    { icon: Gear, label: "Profile", href: "/Dashboard/writer/userprofile" },
  ];

  const adminNav = [
    { icon: ShieldCheck, label: "Overview", href: "/Dashboard/admin" },
    { icon: House, label: "Manage Users", href: "/Dashboard/admin/maneguser" },
    { icon: Book, label: "Manage Ebooks", href: "/Dashboard/admin/manegeEbooks" },
    { icon: Person, label: "Transactions", href: "/Dashboard/admin/tranctiona" },
    { icon: Gear, label: "Settings", href: "/Dashboard/admin/userprofile" },
  ];

  const navMap = {
    "reader" : readerNav,
    "writer" : writerNav,
    "admin" : adminNav,
  };

  const navItems = navMap[userinfo?.role] || readerNav;

  // Check active route
  const isActiveRoute = (href) => {
    if (pathname === href) return true;
    return pathname.startsWith(href) && href !== "/Dashboard/reader" && 
           href !== "/Dashboard/writer" && href !== "/Dashboard/admin";
  };

  const NavSections = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = isActiveRoute(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`
              flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200
              ${isActive 
                ? "bg-primary/10 text-primary font-semibold" 
                : "text-foreground hover:bg-default/50"
              }
            `}
          >
            <item.icon className={`size-5 ${isActive ? "text-primary" : "text-muted"}`} />
            <span>{item.label}</span>
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-default bg-card/50 p-4 lg:block">
        <div className="mb-6 flex items-center gap-3 border-b border-default pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
            {userinfo?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-medium">{userinfo?.name || "User"}</p>
            <p className="text-xs text-muted-foreground capitalize">{userinfo?.role || "Reader"}</p>
          </div>
        </div>
        {NavSections}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Mobile Header */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold">
            {navItems.find(item => isActiveRoute(item.href))?.label || "Dashboard"}
          </h1>
          
          <Drawer>
            <Button variant="secondary" size="sm">
              <Bars className="size-5" />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />
                  <Drawer.Header>
                    <Drawer.Heading>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {userinfo?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{userinfo?.name || "User"}</p>
                          <p className="text-xs text-muted-foreground capitalize">{userinfo?.role || "Reader"}</p>
                        </div>
                      </div>
                    </Drawer.Heading>
                  </Drawer.Header>
                  <Drawer.Body>{NavSections}</Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}