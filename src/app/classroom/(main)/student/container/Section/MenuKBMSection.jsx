import OptionMenu from "../Option/OptionMenu";
import TugasIcon from "@/assets/svgs/tugas.svg";
import BahanAjarIcon from "@/assets/svgs/bahan-ajar.svg";
import AbsensiIcon from "@/assets/svgs/absensi.svg";

const optionMenus = [
  {
    href: "/",
    Icon: TugasIcon,
    text: "Tugas",
  },
  {
    href: "/",
    Icon: BahanAjarIcon,
    text: "Bahan Ajar",
  },
  {
    href: "/",
    Icon: AbsensiIcon,
    text: "Absensi",
  },
];

const MenuKBMSection = () => {
  return (
    <div className="mt-6">
      <h2 className="lg:hidden text-base text-base90 font-bold mb-3">Fitur</h2>
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
