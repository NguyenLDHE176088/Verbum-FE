"use client";
import { Branding } from "@/components/layouts/Branding";
import { Navbar } from "@/components/layouts/Navbar";
import { Header } from "@/components/layouts/Header";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { getLoginStatus } from "@/lib/cookies";

export function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userData, changeUserData } = useContext(UserContext);

  useEffect(() => {
    const checkLogin = async () => {
      let isLogin = false;
      try {
        isLogin = await getLoginStatus(); // true
      } catch (e) {
        isLogin = false;
      } finally {
        changeUserData({ isLogin });
      }
    };
    checkLogin();
  }, [changeUserData]);

  return userData.isLogin ? (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <Branding />
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}
