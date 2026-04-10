"use client";

import "./Navbar.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <img src="/assets/logo.PNG" alt="logo" className="logoImg" />
        <span>情緒宇宙 | EMOTION UNIVERSE</span>
      </div>

      {/* 右邊 */}
      <div className="navbarRight">
        <div className="navbarLinks">
          <Link href="/" className="navLink">首頁</Link>
          <Link href="/universe" className="navLink">情緒宇宙</Link>
          <Link href="/room" className="navLink">情緒小百科</Link>
          <Link href="/about" className="navLink">關於我們</Link>
        </div>


        {user && (
          <Link href="/settings" className="navUser">
            <img src={user.avatar} className="navAvatar" />
            <span className="navUsername">{user.username}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}