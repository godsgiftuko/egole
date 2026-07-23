"use client";

import { useEffect, useState } from "react";
import { UserDashboard } from "../page";

export default function DashboardPage() {
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState("admin@egoole.farm");
  useEffect(() => { if (window.localStorage.getItem("egoole-admin-session") !== "true") { window.location.href = "/login"; return; } setUserEmail(window.localStorage.getItem("egoole-admin-user") || "admin@egoole.farm"); setReady(true); }, []);
  if (!ready) return null;
  const signOut = () => { window.localStorage.removeItem("egoole-admin-session"); window.localStorage.removeItem("egoole-admin-user"); window.location.href = "/"; };
  return <UserDashboard openExplorer={() => { window.location.href = "/markets"; }} manage={() => { window.location.href = "/manage"; }} signOut={signOut} userEmail={userEmail} />;
}
