"use client";
import Modal from "./modal"
import Button from "./button";

export default function Alert({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return <Modal>
    <div className="bg-black px-20 py-10 rounded-2xl">
      {children}
      <Button className="btn-primary w-full p-2 rounded-md" onClick={onClose}>Close</Button>
    </div>
  </Modal>
}
