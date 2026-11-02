import { getEntry } from "@/lib/contentful";

/** Client reviews stored in Contentful, shared by the homepage and location pages */
export async function getClientReviews() {
  const entry = await getEntry("4vS3xsxhN1eATw3l21K6ek");

  const clientReviewsHeadline = entry?.fields?.clientReviewsHeadline || "Our Clients";
  const clientReviewsSubtext = entry?.fields?.clientReviewsSubtext || "Hear firsthand how our solutions have boosted online success for users like you.";

  // Fetch review entries
  const reviewIds = ["XfhCriML9piZujRwHtunQ", "6Zu9M9XpPT6BLYCX49Xex5"];
  const reviewEntries = await Promise.all(reviewIds.map((id) => getEntry(id)));
  const reviews = reviewEntries.map((revEntry, index) => {
    const content = revEntry?.fields?.clientReviewContent;
    let clientName = "Client";
    let clientReview = "Great service!";
    let restaurantName = "Restaurant";
    if (content) {
      let parsed;
      if (typeof content === "string") {
        try {
          parsed = JSON.parse(content);
        } catch (e) {
          console.error("Error parsing clientReviewContent", e);
        }
      } else if (typeof content === "object") {
        parsed = content;
      }
      if (parsed) {
        clientName = parsed.clientName || clientName;
        clientReview = parsed.clientReview || clientReview;
        restaurantName = parsed.restaurantName || restaurantName;
      }
    }
    return {
      id: index + 1,
      name: clientName,
      position: restaurantName,
      review: clientReview,
      image: "/reviewuser.svg",
      companyLogo: revEntry?.fields?.clientLogo ? "https:" + revEntry.fields.clientLogo.fields.file.url : "/reviewuser.svg",
    };
  });

  return { reviews, headline: clientReviewsHeadline, subtext: clientReviewsSubtext };
}
