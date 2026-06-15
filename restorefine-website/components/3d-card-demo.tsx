"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className=" relative group/card   w-auto sm h-auto rounded-xl border  ">
        <CardItem translateZ={20} as="button" className="rounded-xl  dark:bg-white dark:text-black text-white text-xs font-bold">
          <Image src="/nfc_card.png" alt="RestoRefine NFC Card" width={600} height={600} className="rounded-lg  " />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
