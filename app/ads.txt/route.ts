const publisherPattern = /^pub-\d{16}$/;
const verifiedPublisherId = "pub-1949642348561120";

export function GET() {
  const publisherId = process.env.ADSENSE_PUBLISHER_ID?.trim() || verifiedPublisherId;
  if (!publisherId || !publisherPattern.test(publisherId)) {
    return new Response("AdSense publisher ID is not configured.\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
    });
  }
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" }
  });
}
