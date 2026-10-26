import { LinksDesign } from "@/components/designs/links";
// Alternative designs, kept for reference. To compare them again, restore the switcher below.
// import { DesignSwitcher } from "@/components/design-switcher";
// import { CurrentDesign } from "@/components/designs/current";
// import { MapsDesign } from "@/components/designs/maps";

export default function ConnectPage() {
  return <LinksDesign />;
  // return (
  //   <DesignSwitcher
  //     designs={[
  //       { id: "links", label: "Links", node: <LinksDesign /> },
  //       { id: "current", label: "Current", node: <CurrentDesign /> },
  //       { id: "maps", label: "Maps", node: <MapsDesign /> },
  //     ]}
  //   />
  // );
}
