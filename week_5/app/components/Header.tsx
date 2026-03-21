"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
  return (
    <header className="bg-gray-100">
      <nav className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition">
          Portfolio
        </Link>
        <ul className="flex gap-8">
          <li>
            <Link
              href="/" 
              className={`text-gray-600 hover:text-gray-900 transition font-medium text-base ${pathname === '/' ? 'text-gray-900 font-bold' : ''}`}
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`text-gray-600 hover:text-gray-900 transition font-medium text-base ${pathname === '/about' ? 'text-gray-900 font-bold' : ''}`}
            >
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={`text-gray-600 hover:text-gray-900 transition font-medium text-base ${pathname === '/contact' ? 'text-gray-900 font-bold' : ''}`}
            >
              Liên hệ
            </Link>
          </li>
          <li>
            <Link 
              href="/posts" 
              className={`text-gray-600 hover:text-gray-900 transition font-medium text-base ${pathname === '/posts' ? 'text-gray-900 font-bold' : ''}`}
            >
              Bài viết
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
