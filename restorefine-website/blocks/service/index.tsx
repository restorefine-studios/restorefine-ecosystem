import React from "react";
import ServicesHero from "./hero";
import ServiceTypes from "./serviceTypes";
import Cta from "@/components/cta";

interface RestoServicesProps {
  heroHeadline: string;
  heroSubtext: string;
  serviceHeadline: string;
  serviceSubtext: string;
  subServices: any[];
  serviceDetails: any[];
}

function RestoServices(props: RestoServicesProps) {
  return (
    <main>
      <ServicesHero
        headline={props.heroHeadline}
        subtext={props.heroSubtext}
      />
      <ServiceTypes
        headline={props.serviceHeadline}
        subtext={props.serviceSubtext}
        subServices={props.subServices}
        serviceDetails={props.serviceDetails}
      />
      <Cta />
    </main>
  );
}

export default RestoServices;
