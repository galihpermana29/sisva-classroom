import AbsensiIcon from "@/assets/svgs/absensi.svg";
import BahanAjarIcon from "@/assets/svgs/bahan-ajar.svg";
import TugasIcon from "@/assets/svgs/tugas.svg";
import OptionMenu from "../Option/OptionMenu";

const optionMenus = [
  {
    href: "/classroom/student/class",
    Icon: TugasIcon,
    text: "Tugas",
  },
  {
    href: "/classroom/student/class",
    Icon: BahanAjarIcon,
    text: "Bahan Ajar",
  },
  {
    href: "/classroom/student/class",
    Icon: AbsensiIcon,
    text: "Absensi",
  },
];

const MenuKBMSection = () => {
  return (
    <div className="mt-6">
      <h2 className="mb-3 text-base font-bold lg:hidden text-base90">Fitur</h2>
      <div className="flex justify-center gap-10 lg:gap-[54px] ">
        {optionMenus.map((optionMenu, index) => (
          <OptionMenu
            key={index}
            href={optionMenu.href}
            icon={optionMenu.Icon.src}
            text={optionMenu.text}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuKBMSection;
