import BahanAjarIcon from "@/assets/classroom/teacher/BahanAjarIcon";
import PerizinanIcon from "@/assets/classroom/teacher/PerizinanIcon";
import TugasIcon from "@/assets/classroom/teacher/TugasIcon";
import Link from "next/link";

const MenuKBMSection = () => {
  return (
    <div className="mt-10 ">
      <h2 className="text-base font-bold md:hidden">Fitur</h2>

      <div className="grid grid-cols-3 gap-4 mx-auto mt-4 md:gap-12 w-fit">
        {getMenuKBM().map((menu, index) => (
          <Link href={menu.href} key={"kbmMenu_" + index}>
            <div className="flex flex-col items-center">
              {menu.icon}
              <p className="mt-1 text-sm">{menu.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuKBMSection;

const getMenuKBM = () => {
  return [
    {
      label: "Tugas",
      icon: <TugasIcon className="size-12" />,
      href: "/classroom/teacher/class",
    },
    {
      label: "Bahan Ajar",
      icon: <BahanAjarIcon className="size-12" />,
      href: "/classroom/teacher/teaching-material",
    },
    {
      label: "Perizinan",
      icon: <PerizinanIcon className="size-12" />,
      href: "/classroom/teacher/class",
    },
  ];
};
