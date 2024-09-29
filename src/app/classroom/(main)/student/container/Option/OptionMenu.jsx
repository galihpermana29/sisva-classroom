import Link from "next/link";
import { Avatar, Flex } from "antd";

const OptionMenu = ({ href, icon, text }) => {
  return (
    <Link href={href}>
      <Flex vertical align="center" gap={8}>
        <Avatar src={icon} size={54} />
        <p className="text-base90 text-xs lg:text-sm">{text}</p>
      </Flex>
    </Link>
  );
};

export default OptionMenu;
