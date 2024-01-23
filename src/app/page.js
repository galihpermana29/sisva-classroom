import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import Image from "next/image";

export const metadata = {
  title: "Demo Aplikasi | SISVA",
  description: "SISVA | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <Header />
      <section className="flex flex-col lg:flex-row min-h-[85svh] lg:min-h-[85svh] w-screen justify-center pt-[10svh] lg:pt-[15svh] pb-[10svh] px-[8vw] lg:px-0 items-center">
        <div className="flex justify-center items-center text-center lg:ml-[5svh] min-h-[35svh] min-w-[50svh] max-w-[80vw] sm:min-h-[45svh] sm:min-w-[45svh] sm:max-w-[40vw]  lg:min-h-[60svh] lg:min-w-[60svh] lg:max-w-[30vw] relative">
          <Image
            fill
            src="/images/Hero-Illustration.png"
            alt="Students Smiling"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="w-[100%] lg:w-[30vw] lg:ml-[4svh] mt-[2svh] lg:mt-0 flex flex-col items-center lg:items-start ">
          <div
            className="text-[3.6svh]  lg:text-[6svh]  lg:max-w-[auto] text-center lg:text-left font-bold leading-[120%] kumbh-sans"
            style={{
              background:
                "linear-gradient(142deg, #1F8CD3 11.11%, #225ED5 86.15%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Demo Aplikasi
          </div>
          <div className="mt-[1svh] text-[2.2svh] lg:text-[2.4svh] text-center lg:text-left lg:max-w-[50svh]   ">
            Hubungi kami untuk mendapatkan akses untuk menggunakan aplikasi.
          </div>
          <a href="/administration" target="_blank">
            <button
              className="mt-[2svh] px-[3svh] text-[2svh] lg:text-[2.2svh]  py-[1.25svh] font-semibold text-white kumb-sans rounded-[1svh]"
              style={{
                background:
                  "linear-gradient(142deg, #1F8CD3 11.11%, #225ED5 86.15%)",
              }}
            >
              Sisva Administration
            </button>
          </a>

          <a href="/classroom" target="_blank">
            <button
              className="mt-[1svh] px-[3svh] text-[2svh] lg:text-[2.2svh]  py-[1.25svh] font-semibold text-white kumb-sans rounded-[1svh]"
              style={{
                background:
                "linear-gradient(142deg, #F96756  11.11%, #F03721  86.15%)",
              }}
            >
              Sisva Classroom
            </button>
          </a>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
