import Link from "next/link";
import { getMenus } from "@/lib/menus";

export default function Sidebar({ role }: { role: string }) {
  const menus = getMenus(role);

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">CMS Panel</h2>
      <nav className="space-y-2">
        {menus.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
