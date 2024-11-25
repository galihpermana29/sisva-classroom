import { Kumbh_Sans } from "next/font/google";
import React from "react";

import SignInContainer from "./view/container/SigninContainer";
const kumbh = Kumbh_Sans({
  subsets: ["latin"],
});

const SignInPage = () => {
  return (
    <div
      style={{
        fontFamily: kumbh.style.fontFamily,
      }}
    >
      <SignInContainer />
    </div>
  );
};

export default SignInPage;
