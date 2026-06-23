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
import toast, { Toaster } from 'react-hot-toast';

export function Dashboradlayout({ children }) {
  const pathname = usePathname();
  const [userinfo, setUserinfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userdata();
        setUserinfo(data);
        toast.success(`Welcome back, ${data?.name || 'User'}!`);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error('Failed to load user data');
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

  // Handle navigation click
  const handleNavClick = (label) => {
    toast.success(`Navigating to ${label}`);
  };

  const NavSections = (
    <nav className="flex flex-col gap-1 sm:gap-1.5">
      {navItems.map((item) => {
        const isActive = isActiveRoute(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleNavClick(item.label)}
            className={`
              flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200
              ${isActive 
                ? "bg-primary/10 text-primary font-semibold" 
                : "text-foreground hover:bg-default/50"
              }
            `}
          >
            <item.icon className={`size-4 sm:size-5 ${isActive ? "text-primary" : "text-muted"}`} />
            <span className="truncate">{item.label}</span>
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden w-56 sm:w-60 md:w-64 shrink-0 border-r border-default bg-card/50 p-3 sm:p-4 lg:block">
        <div className="mb-4 sm:mb-6 flex items-center gap-3 border-b border-default pb-3 sm:pb-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm sm:text-base">
            {userinfo?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{userinfo?.name || "User"}</p>
            <p className="text-xs text-muted-foreground capitalize truncate">{userinfo?.role || "Reader"}</p>
          </div>
        </div>
        {NavSections}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        {/* Mobile Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between lg:hidden">
          <h1 className="text-lg sm:text-xl font-bold truncate">
            {navItems.find(item => isActiveRoute(item.href))?.label || "Dashboard"}
          </h1>
          
          <Drawer>
            <Button variant="secondary" size="sm" className="p-2 sm:p-2.5">
              <Bars className="size-5 sm:size-5" />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content placement="left" className="w-[280px] sm:w-[320px]">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />
                  <Drawer.Header>
                    <Drawer.Heading className="w-full">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm sm:text-base">
                          {userinfo?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-medium truncate">{userinfo?.name || "User"}</p>
                          <p className="text-xs text-muted-foreground capitalize truncate">{userinfo?.role || "Reader"}</p>
                        </div>
                      </div>
                    </Drawer.Heading>
                  </Drawer.Header>
                  <Drawer.Body className="px-4 sm:px-6">
                    {NavSections}
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>

        {/* Page Content */}
        <div className="min-w-0 overflow-x-auto">
          {children}
        </div>
      </main>
    </div>
  );
}