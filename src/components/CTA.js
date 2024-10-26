'use client';

import React, { useState } from 'react';

import Image from 'next/image';

export default function CTA() {
  return (
    <section
      className="w-screen relative flex flex-col-reverse sm:flex-row items-center min-h-[18svh]  justify-center z-[50] pt-[4svh] sm:pt-0"
      style={{
        background: 'linear-gradient(142deg, #1F8CD3 11.11%, #225ED5 86.15%)',
      }}
    >
      <div className="self-end h-[20svh] w-[100%] sm:w-[40vw] lg:w-[27svh] relative mt-[2svh] ml-[10vw] lg:ml-0">
        <Image
          fill
          src="/images/CTA-Illustration.png"
          style={{ objectFit: 'contain', objectPosition: 'bottom' }}
          alt=""
        />
      </div>
      <div className="flex flex-wrap flex-col sm:flex-row text-center sm:text-left items-center max-w-[85vw] sm:max-w-[70vw]">
        <div className="flex text-white sm:mr-[4svh] my-[1svh] text-[2.2svh] lg:text-[2.4svh]">
          <i>Tunggu apa lagi? Ayo permudah semua urusan sekolah anda!</i>
        </div>

        <a href="https://www.sisva.id/contact">
          <button
            className="mt-[1svh] px-[3svh] py-[1.25svh] text-[2svh] lg:text-[2.2svh] font-semibold text-white kumb-sans rounded-[8svh]"
            style={{
              background:
                'linear-gradient(142deg, #F96756  11.11%, #F03721  86.15%)',
            }}
          >
            Bergabung Sekarang
          </button>
        </a>
      </div>
    </section>
  );
}
