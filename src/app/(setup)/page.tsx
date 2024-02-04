import InitialProfile from "@/lib/initial-profile";
import React from "react";

export default async function SetupPage() {
  const profile = await InitialProfile();
}
