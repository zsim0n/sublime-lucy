import nameGenerator from "@stackbit/artisanal-names";

const MAX_COUNT = 50;

// Served at /.netlify/functions/sublime-lucy (the documented CLI endpoint) and
// at the friendlier /api/name alias below.
export default async (req) => {
  const params = new URL(req.url).searchParams;

  const requested = Number.parseInt(params.get("count") ?? "1", 10);
  const count = Number.isNaN(requested)
    ? 1
    : Math.min(Math.max(requested, 1), MAX_COUNT);

  const names = Array.from({ length: count }, () => nameGenerator.generate());

  const headers = {
    // Names are random, so any cached response is a stale name.
    "cache-control": "no-store",
    // Public read-only endpoint - lets browser clients call it directly.
    "access-control-allow-origin": "*",
  };

  if (params.get("format") === "json") {
    return Response.json({ names }, { headers });
  }

  return new Response(names.join("\n") + "\n", {
    headers: { ...headers, "content-type": "text/plain; charset=utf-8" },
  });
};

export const config = {
  path: "/api/name",
};
