"use client";

import React, { useState } from "react";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col pt-[4svh] pb-[2svh] px-[5vw] px-[10vw] lg:pr-[5vw] w-screen">
      <div className="flex w-[100%] flex-col lg:flex-row ">
        <div className=" flex flex-[2] flex-col items-center lg:items-start text-center lg:text-left">
          <div className="h-[6svh] w-[12svh] lg:h-[7svh] lg:w-[14svh] relative">
            <Image
              src="/images/Sisva-LogoType-Black.png"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <p className="text-[1.7svh] lg:text-[1.9svh] leading-[120%] text-[#484040] mt-[2svh] font-light">
            Perumahan Nuansa Telaga Kalibaru
            <br />
            Blok E28, Kota Depok, Jawa Barat
          </p>
        </div>{" "}
        <div className="flex-[2] flex flex-wrap mx-[2vw]">
          <div className="flex-[1] font-light flex flex-col mt-[2svh] lg:mt-0  items-center lg:items-start">
            <h3 className="font-semibold text-[1.7svh] lg:text-[1.9svh] mb-[1svh] ">Kontak</h3>
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] mb-[.5svh]">
              <svg
                className="h-[2.5svh] w-[2.5svh] mr-[1svh] hidden lg:flex"
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.528784 3.6416L5.98356 7.2866C7.26421 8.13787 7.90454 8.56351 8.59639 8.7289C9.2078 8.87507 9.84507 8.87507 10.4565 8.7289C11.1483 8.56351 11.7887 8.13787 13.0693 7.2866L18.4736 3.68165M5.3 14.6416H13.7C15.3802 14.6416 16.2202 14.6416 16.862 14.3146C17.4265 14.027 17.8854 13.5681 18.173 13.0036C18.5 12.3618 18.5 11.5218 18.5 9.8416V5.4416C18.5 3.76144 18.5 2.92137 18.173 2.27963C17.8854 1.71514 17.4265 1.2562 16.862 0.968582C16.2202 0.641602 15.3802 0.641602 13.7 0.641602H5.3C3.61984 0.641602 2.77976 0.641602 2.13803 0.968582C1.57354 1.2562 1.1146 1.71514 0.82698 2.27963C0.5 2.92137 0.5 3.76144 0.5 5.4416V9.8416C0.5 11.5218 0.5 12.3618 0.82698 13.0036C1.1146 13.5681 1.57354 14.027 2.13803 14.3146C2.77976 14.6416 3.61984 14.6416 5.3 14.6416Z"
                  stroke="#484040"
                  strokeOpacity="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <a href="mailto:info@sisva.id">info@sisva.id</a>
            </div>
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] mb-[.5svh]">
              <svg
                className="h-[2.5svh] w-[2.5svh] mr-[1svh] hidden lg:flex"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_165_8761"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="21"
                  height="21"
                >
                  <path
                    d="M0.5 0.641602H20.5V20.6416H0.5V0.641602Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_165_8761)">
                  <path
                    d="M2.28391 15.2287C1.52164 13.8727 1.08691 12.3079 1.08691 10.6416C1.08691 5.46391 5.32332 1.22754 10.501 1.22754C15.6787 1.22754 19.915 5.46391 19.915 10.6416C19.915 15.8193 15.6787 20.0557 10.501 20.0557C8.83465 20.0557 7.26988 19.6209 5.91387 18.8587L1.08691 20.0557L2.28391 15.2287Z"
                    stroke="#484040"
                    strokeOpacity="1"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.39605 11.746C9.0075 11.3562 7.44792 9.62549 8.01542 9.05799C8.1714 8.90202 8.79507 8.476 9.03839 8.23268C9.86703 7.40405 8.91632 6.37811 8.30667 5.76846C8.25687 5.71866 7.31839 4.70862 6.07246 5.95459C3.84492 8.18213 7.02003 12.1763 7.98816 13.1539C8.96578 14.1221 12.9599 17.2972 15.1875 15.0696C16.4335 13.8237 15.4234 12.8852 15.3736 12.8354C14.764 12.2258 13.738 11.2751 12.9094 12.1037C12.6661 12.347 12.2401 12.9706 12.0841 13.1266C11.5166 13.6942 9.78585 12.1346 9.39605 11.746Z"
                    fill="#484040"
                    strokeOpacity="1"
                    strokeMiterlimit="10"
                  />
                </g>
              </svg>
              <a href="https://wa.me/62811265665?text=Halo%2C+saya+tertarik+dengan+produk+SISVA.">
                +62 811 265 665
              </a>
            </div>{" "}
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] mb-[.5svh]">
              <svg
                className="h-[2.5svh] w-[2.5svh] mr-[1svh] hidden lg:flex"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_165_8775"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="21"
                  height="21"
                >
                  <path
                    d="M0.5 0.641602H20.5V20.6416H0.5V0.641602Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_165_8775)">
                  <path
                    d="M19.7188 10.6416C19.7168 11.4637 19.7075 12.2859 19.6963 13.1079C19.6827 14.0998 19.6674 15.092 19.4186 16.0669C19.1578 17.0891 18.6434 17.9708 17.843 18.6235C16.9995 19.3113 15.9801 19.6728 14.8798 19.7397C13.4204 19.8285 11.9604 19.8636 10.5004 19.8601C9.04042 19.8636 7.58042 19.8285 6.12109 19.7397C5.02077 19.6728 4.00132 19.3113 3.15788 18.6235C2.35749 17.9708 1.84304 17.0891 1.58218 16.0669C1.33343 15.092 1.31812 14.0998 1.30456 13.1079C1.29331 12.2859 1.28398 11.4637 1.28206 10.6416C1.28398 9.8195 1.29331 8.99735 1.30456 8.17528C1.31812 7.18344 1.33343 6.19118 1.58218 5.21633C1.84304 4.19407 2.35749 3.31243 3.15788 2.65973C4.00132 1.97192 5.02077 1.61039 6.12109 1.54348C7.58042 1.45473 9.04042 1.41965 10.5004 1.42309C11.9604 1.41965 13.4204 1.45473 14.8798 1.54348C15.9801 1.61039 16.9995 1.97192 17.843 2.65973C18.6434 3.31243 19.1578 4.19407 19.4186 5.21633C19.6674 6.19118 19.6827 7.18344 19.6963 8.17528C19.7075 8.99735 19.7168 9.8195 19.7188 10.6416Z"
                    stroke="#484040"
                    strokeOpacity="1"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M14.5631 10.6416C14.5631 12.9068 12.7268 14.7432 10.4616 14.7432C8.19635 14.7432 6.36002 12.9068 6.36002 10.6416C6.36002 8.37637 8.19635 6.54004 10.4616 6.54004C12.7268 6.54004 14.5631 8.37637 14.5631 10.6416Z"
                    stroke="#484040"
                    strokeOpacity="1"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M17.0623 5.36816C17.0623 6.01535 16.5376 6.54004 15.8905 6.54004C15.2433 6.54004 14.7186 6.01535 14.7186 5.36816C14.7186 4.72098 15.2433 4.19629 15.8905 4.19629C16.5376 4.19629 17.0623 4.72098 17.0623 5.36816Z"
                    fill="#484040"
                    fillOpacity="1"
                  />
                </g>
              </svg>
              <a href="https://www.instagram.com/sisva.id/">sisva.id</a>
            </div>
          </div>
          <div className="flex-[1] font-light mt-[2svh] lg:mt-0 flex flex-col items-center lg:items-start">
            <h3 className="font-semibold text-[1.7svh] lg:text-[1.9svh] mb-[.5svh] ">Sisva</h3>
            {/* <div className='d-flex flex-xs-flex flex-lg-column align-items-start'> */}
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] ">
              <a href="https://sisva.vercel.app/about">Tentang Sisva</a>
            </div>
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] ">
              <a href="https://sisva.vercel.app/product">Produk</a>
            </div>{" "}
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] ">
              <a href="https://sisva.vercel.app/contact">Kontak</a>
            </div>
            <div className="flex items-center text-[1.7svh] lg:text-[1.9svh] ">
              <a href="https://demo.sisva.id/">Coba Aplikasi</a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[1.7svh] lg:text-[1.9svh] font-light text-center mt-[3svh]">
        Copyright © 2024 PT. Temui Inovasi Kuantum
      </div>
    </footer>
  );
}
