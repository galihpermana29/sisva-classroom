import Image from "next/image";

import BoxRightImg from "@/assets/svgs/box-right.svg";

const BoxLeft = () => {
  return (
    <div
      className="size-[230px] lg:size-[217px] rounded-3xl absolute -left-20 top-6 lg:top-2 lg:-left-24"
      style={{
        transform: "rotate(-48.471deg)",
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.00) 0.01%, rgba(255, 255, 255, 0.03) 48.21%, rgba(255, 255, 255, 0.10) 100%)",
      }}
    />
  );
};

const BoxTop = ({ className, rotate }) => {
  return (
    <div
      className={`absolute rounded-full  ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(255, 255, 255, 0.00) 100%)",
        opacity: "0.15",
      }}
    />
  );
};

const BoxRight = () => {
  return (
    <Image
      src={BoxRightImg}
      alt=""
      className="absolute bottom-0 right-0 lg:-bottom-8 "
    />
  );
};

export { BoxLeft, BoxRight, BoxTop };

