import clsx from "clsx";
import React from "react";

const SisvaCard = ({ children, className, onClick }) => {
  return (
    <div
      className={clsx(
        "cursor-pointer rounded-xl bg-primary relative p-5",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-15 rounded-full" />
      {children}
    </div>
  );
};

export default SisvaCard;
