"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom"

export default function Modal({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<HTMLElement>();

  useEffect(() => {
    const modalContainer = document.getElementById("modal");
    if (!modalContainer) return;

    setModal(modalContainer)
  }, [])

  if (!modal) return;

  return createPortal(<div className="absolute w-full h-full flex items-center justify-center">
    <div className="absolute bg-black opacity-50 w-full h-full"></div>
    <div className="z-10">
      { children }
    </div>
  </div>, modal);
}
