/* eslint-disable react/prop-types */
import React from "react";
import { closeModal } from "./ui/svg";

export default function CloseModal({ onRequestClose }) {
  return (
    <div
      className="w-5 h-5 absolute right-2 top-2 cursor-pointer"
      onClick={onRequestClose}
    >
      {closeModal}
    </div>
  );
}
