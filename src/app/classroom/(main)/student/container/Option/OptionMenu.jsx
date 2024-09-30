import Link from "next/link";
import { Avatar } from "antd";

const OptionMenu = ({ href, icon, text }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col gap-2 items-center">
        <Avatar src={icon} size={54} />
        <p className="text-base90 text-xs lg:text-sm">{text}</p>
      </div>
    </Link>
  );
};

export default OptionMenu;
