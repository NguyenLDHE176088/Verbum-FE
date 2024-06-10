import { Badge } from "@/components/ui/badge";
import { File, Folder, Home, LineChart, Package, ShoppingCart, User, Users } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/projects"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Folder className="h-4 w-4" />
          Projects
        </Link>
        <Link
          href="/jobs"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <File className="h-4 w-4" />
          Jobs
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>
        <Link
          href="/user"
          className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
        >
          <User className="h-4 w-4" />
          Users
        </Link>
      </nav>
    </div>
  );
}
