import { siteUrl } from "../../../lib/constants";
// Removed: import { basehub } from "basehub";

export async function GET() {
  // Return a static or placeholder RSS feed
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
          <channel>
              <title>Mintiq Blog</title>
              <link>${siteUrl}/blog</link>
              <language>en-us</language>
              <item>
                  <title>Welcome to Mintiq Blog</title>
                  <link>${siteUrl}/blog</link>
                  <description>This is a static placeholder post.</description>
                  <pubDate>${new Date().toUTCString()}</pubDate>
              </item>
          </channel>
      </rss>`;

  return new Response(feed, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml" },
  });
}
