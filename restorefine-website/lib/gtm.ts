export type GTMEventMap = {
  enquiry_step_complete:
    | { step: 1; category: string }
    | { step: 2 | 3 | 4 | 5 };
  enquiry_submitted: { category: string | null };
  contact_form_submitted: Record<string, never>;
  whatsapp_click: { location: "header" | "footer" | "page" };
  email_click: { location: "header" | "footer" | "contact" };
  directions_click: Record<string, never>;
  social_click: { network: "instagram" | "linkedin" };
  portfolio_item_click: { item: string };
  outbound_click: { url: string; location: string };
  scroll_depth: { percent: 25 | 50 | 75 | 90; page: string };
  page_not_found: { attempted_path: string };
};

type GTMEventName = keyof GTMEventMap;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const pushGTMEvent = <EventName extends GTMEventName>(
  event: EventName,
  params = {} as GTMEventMap[EventName],
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
};
