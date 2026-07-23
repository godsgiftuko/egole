"use client";

import { useEffect, useState } from "react";
import { CommodityManager } from "../page";

export default function ManagePage() {
  const [ready, setReady] = useState(false);
  useEffect(() => { if (window.localStorage.getItem("egoole-admin-session") !== "true") { window.location.href = "/login"; return; } setReady(true); }, []);
  if (!ready) return null;
  return <CommodityManager back={() => { window.location.href = "/dashboard"; }} />;
}
