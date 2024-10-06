import React from "react";

const NotFoundPageComponent = ({ title }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="text-center text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPageComponent;
