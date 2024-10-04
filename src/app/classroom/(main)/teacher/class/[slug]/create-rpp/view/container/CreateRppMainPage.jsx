"use client";
import React from "react";
import { ModalProvider } from "./Provider/ModalProvider";
import CreateRppContainer from "./CreateRppContainer";

const CreateRppMainPage = () => {
  return (
    <ModalProvider>
      <CreateRppContainer />
    </ModalProvider>
  );
};

export default CreateRppMainPage;
