import { cn } from "@/lib/utils";
import { BellRing, User, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: User,
    variant: "ghost",
  },
  {
    title: "Team members",
    href: "/settings/team",
    icon: Users,
    variant: "default",
  },
];

const SettingsNavBar = () => {
  const pathName = usePathname();
  return (
    <nav className="flex flex-col justify-start gap-1 px-4 py-8 w-1/4 bg-white shadow-xl rounded-xl h-full">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            buttonVariants({
              variant: link.href === pathName ? "default" : "ghost",
              size: "sm",
            }),
            link.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start"
          )}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default SettingsNavBar;
