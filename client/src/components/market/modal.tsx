import React from "react";
import { BiX } from "react-icons/bi";

const Modal = ({
  open,
  setModalOpen,
}: {
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`z-[100] transition-all w-screen h-screen absolute flex justify-end ${
        open ? "left-0" : "left-[100vw]"
      }`}
      onClick={() => setModalOpen(false)}
    >
      <div className="h-full bg-white mr-0 overflow-hidden w-[28rem]">
        <div className="w-full h-20 flex items-center justify-between px-4">
          <button
            className="flex items-center justify-center p-2 rounded-full border border-dark hover:bg-dark transition-colors hover:text-white"
            onClick={() => setModalOpen(false)}
          >
            <BiX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
