/** "Sunday 15 November, 12 PM" in the client's own time zone */
export function formatLaunch(at: string | number, timeZone: string) {
  const d = new Date(at);
  const day = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone });
  const time = d
    .toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone })
    .replace(":00", "")
    .toUpperCase();
  return `${day}, ${time}`;
}
