import clsx from "clsx";
import React from "react";

const SisvaCard = ({ children, className, onClick }) => {
  return (
    <div
      className={clsx(
        "cursor-pointer rounded-xl bg-primary relative p-3 sm:p-4 md:p-5",
        "transition-all duration-300 ease-in-out hover:shadow-lg",
        className
      )}
      onClick={onClick}
    >
      <div
        className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6 
                   w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                   bg-white opacity-15 rounded-full"
      />
      {children}
    </div>
  );
};

export default SisvaCard;
