"use client";

import { Badge } from "@/components/ui/badge";
import {
  File,
  Folder,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/projects"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/projects" ? "bg-muted" : ""
          }`}
        >
          <Folder className="h-4 w-4" />
          Projects
        </Link>
        <Link
          href="/jobs"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/jobs" ? "bg-muted" : ""
          }`}
        >
          <File className="h-4 w-4" />
          Jobs
        </Link>
        <Link
          href="/user"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/user" ? "bg-muted" : ""
          }`}
        >
          <User className="h-4 w-4" />
          Users
        </Link>
      </nav>
    </div>
  );
}
