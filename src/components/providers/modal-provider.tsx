"use client";

import CreateServerModal from "@/app/modals/create-server-modal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />;
    </>
  );
}
