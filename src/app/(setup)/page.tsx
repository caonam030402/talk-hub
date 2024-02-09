import React, { useEffect } from "react";
import InitialModal from "../modals/initial-modal";
import InitialProfile from "@/lib/initial-profile";

export default async function SetupPage() {
  await InitialProfile();
  return (
    <div>
      <InitialModal />
    </div>
  );
}
