import { eq } from "drizzle-orm";
import { db } from "~/server/lib/db/drizzle";
import { searchBiblio, biblio } from "~/server/lib/migrations/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const biblioItem = await db
    .select()
    .from(searchBiblio)
    .where(eq(searchBiblio.biblioId, Number(id)));

  return {
    result: biblioItem,
  };
});
