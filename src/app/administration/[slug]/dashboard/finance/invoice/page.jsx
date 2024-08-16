import { getValidTab } from "./utils/getValidTab";

export default function Home({ searchParams }) {
  const { activeTab } = getValidTab(searchParams.tab);
  return activeTab.component;
}

/** @description Generate dynamic metadata title based on selected tab */
export async function generateMetadata({ searchParams }) {
  const currentTabParam = Number(searchParams.tab);
  const {
    activeTab: { title: tabTitle },
  } = getValidTab(currentTabParam);

  return {
    title: `${tabTitle} | Sisva`,
    description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
  };
}
