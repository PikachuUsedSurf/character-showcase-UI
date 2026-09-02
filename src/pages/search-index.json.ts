import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const games = await getCollection("games", (g) => g.data.enabled !== false);
  const gameById = new Map(games.map((g) => [g.id, g.data]));
  const characters = await getCollection("characters");

  const index = characters
    .filter((c) => gameById.has(c.id.split("/")[0]))
    .map((c) => {
      const [gameId, slug] = c.id.split("/");
      const game = gameById.get(gameId)!;
      return {
        name: c.data.name,
        role: c.data.role ?? c.data.tag ?? "",
        game: gameId,
        gameName: game.name,
        accent: game.accent,
        href: `/${gameId}/characters/${slug}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
};
