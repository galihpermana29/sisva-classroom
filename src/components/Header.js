'use client';

import { Dialog, Popover } from '@headlessui/react';
import {
  PhoneIcon,
  PlayCircleIcon
} from '@heroicons/react/20/solid';
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

import { usePathname } from 'next/navigation';

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="bg-[rgb(255,255,255,.90)]  w-screen fixed z-[1000] backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="https://www.sisva.id/" className="-m-1.5 p-1.5">
            <Image
              className="h-8 w-auto"
              src="/images/Sisva-LogoType-Black.png"
              alt=""
              width={1007}
              height={526}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex items-center z-[1000]  ">
          <a
            href="https://www.sisva.id/"
            className={`text-[2.1svh] mr-[5svh] leading-6 text-gray-900 `}
          >
            Beranda
          </a>
          <a
            href="https://www.sisva.id/about"
            className={`text-[2.1svh] mr-[5svh] leading-6 text-gray-900 ${
              pathname === '/about' ? 'font-medium' : ''
            }`}
          >
            Tentang Sisva
          </a>
          <a
            href="https://www.sisva.id/product"
            className={`text-[2.1svh] pr-[5svh] leading-6 text-gray-900 border-r-[rgb(0,0,0,0.3)] border-r-[1px] ${
              pathname === '/product' ? 'font-medium' : ''
            }`}
          >
            Produk
          </a>

          <div className="hidden lg:flex ml-[2svh]">
            <a href="https://demo.sisva.id">
              <button
                className="text-[1.9svh] font-semibold leading-6 text-[#F96756] px-[1.5svh] py-[.75svh] rounded-[.75svh] mr-[1svh]  transition-all duration-200 hover:bg-[#F96756] hover:text-white"
                style={{ border: '1.5px solid #F96756' }}
              >
                Demo Aplikasi
              </button>
            </a>
            <a href="https://www.sisva.id/contact">
              <button
                style={{ border: '1.5px solid #208CD3' }}
                className="text-[1.9svh] font-semibold leading-6 text-[#208CD3]  px-[1.5svh] py-[.75svh] rounded-[.75svh] transition-all 2uration-300 hover:bg-[#208CD3] hover:text-white"
              >
                Hubungi Kami
              </button>
            </a>
          </div>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-[1000] " />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1000] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src="/images/Sisva-LogoType-Black.png"
                alt=""
                height={526}
                width={1007}
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-3">
                <a
                  href="https://www.sisva.id/"
                  className={`-mx-3 block rounded-lg px-3 mb-2 text-[2svh] text-center  leading-7 text-gray-900 hover:bg-gray-50`}
                >
                  Beranda
                </a>
                <a
                  href="https://www.sisva.id/about"
                  className={`-mx-3 block rounded-lg px-3 mb-2 text-[2svh] text-center ${
                    pathname === '/about' ? 'font-medium' : ''
                  } leading-7 text-gray-900 hover:bg-gray-50`}
                >
                  Tentang Sisva
                </a>
                <a
                  href="https://www.sisva.id/product"
                  className={`-mx-3 block rounded-lg px-3 text-[2svh] text-center ${
                    pathname === '/product' ? 'font-medium' : ''
                  } leading-7 text-gray-900 hover:bg-gray-50`}
                >
                  Produk
                </a>
              </div>
              <div className="py-[2svh]">
                <a
                  href="https://demo.sisva.id"
                  className="-mx-3 block rounded-lg px-3 mb-2.5 text-base font-semibold leading-7 text-gray-900"
                >
                  <button className="text-[1.8svh] font-semibold leading-6 text-white bg-[#F96756] px-[1.5svh] py-[.75svh] rounded-[.75svh] mr-[1svh] w-[100%]">
                    Demo Aplikasi
                  </button>
                </a>
                <a
                  href="https://www.sisva.id/contact"
                  className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900"
                >
                  <button className="text-[1.8svh] font-semibold leading-6 text-white bg-[#208CD3] border-[1.5px] px-[1.5svh] py-[.75svh] rounded-[.75svh] w-[100%]">
                    Hubungi Kami
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
