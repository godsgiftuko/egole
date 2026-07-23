"use client";

import { Login } from "../page";

export default function LoginPage() {
  return <Login back={() => { window.location.href = "/"; }} enter={() => { window.localStorage.setItem("egoole-admin-session", "true"); window.localStorage.setItem("egoole-admin-user", "admin@egoole.farm"); window.location.href = "/dashboard"; }} />;
}
