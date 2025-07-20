import { siteUrl } from "../lib/constants";
import type { MetadataRoute } from "next";

export const revalidate = 1800; // 30 minutes - adjust as needed

export default function sitemap(): MetadataRoute.Sitemap {
  // Provide a static list of URLs for the sitemap
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
    },
    // Add more static URLs as needed
  ];
}
