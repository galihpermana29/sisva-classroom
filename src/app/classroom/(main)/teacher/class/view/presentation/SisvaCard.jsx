import clsx from "clsx";
import React from "react";

const SisvaCard = ({ children, className }) => {
  return (
    <div className={clsx("rounded-xl bg-primary relative p-5", className)}>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-15 rounded-full" />
      {children}
    </div>
  );
};

export default SisvaCard;
