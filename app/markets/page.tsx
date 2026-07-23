"use client";

import { useEffect, useState } from "react";
import { Dashboard } from "../page";

export default function MarketsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("admin@egoole.farm");
  useEffect(() => { setAuthenticated(window.localStorage.getItem("egoole-admin-session") === "true"); setUserEmail(window.localStorage.getItem("egoole-admin-user") || "admin@egoole.farm"); }, []);
  const signOut = () => { window.localStorage.removeItem("egoole-admin-session"); window.localStorage.removeItem("egoole-admin-user"); window.location.href = "/"; };
  return <Dashboard exit={() => { window.location.href = "/"; }} signOut={signOut} openUpdate={() => { window.location.href = "/manage"; }} canManage={authenticated} userEmail={userEmail} />;
}
