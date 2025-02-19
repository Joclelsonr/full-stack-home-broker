"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import {
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export function Navbar() {
  const searchParams = useSearchParams();
  const wallet_id = searchParams.get("wallet_id");

  return (
    <FlowbiteNavbar fluid rounded>
      <NavbarBrand href="/">
        <Image
          className="mr-3"
          alt="investidor.me"
          src="/logo.png"
          width={170}
          height={170}
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <div className="content-center">
          Olá {wallet_id?.substring(0, 5)}...
        </div>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href={`/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Carteira</NavbarLink>
        </Link>
        <Link href={`/assets/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Ativos</NavbarLink>
        </Link>
        <Link href={`/orders?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink href="#" className="text-xl">
            Ordens
          </NavbarLink>
        </Link>
      </NavbarCollapse>
    </FlowbiteNavbar>
  );
}
