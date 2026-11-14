import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { clients, getClient } from "@/lib/clients";
import { Countdown } from "@/components/countdown";
import { formatLaunch } from "@/lib/format";

type Props = { params: Promise<{ client: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return clients.map((c) => ({ client: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = getClient((await params).client);
  if (!client) return {};
  return {
    title: `${client.name} Opening Countdown`,
    description: `${client.name} opens ${formatLaunch(client.launchAt, client.timeZone)}.${
      client.address ? ` ${client.address.label}.` : ""
    }`,
    icons: { icon: client.icon },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const client = getClient((await params).client);
  return { themeColor: client?.colors.ink };
}

export default async function ClientCountdown({ params }: Props) {
  const client = getClient((await params).client);
  if (!client) notFound();
  return <Countdown client={client} />;
}
