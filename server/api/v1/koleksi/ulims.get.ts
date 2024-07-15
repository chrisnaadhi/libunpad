import { and, isNotNull, like, ne, or, sql } from "drizzle-orm";
import { db } from "~/server/lib/db/drizzle";
import { searchBiblio } from "~/server/lib/migrations/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let results = null;

  if (query.search !== undefined && query.offset !== undefined) {
    let res = await db
      .select()
      .from(searchBiblio)
      .where(
        or(
          like(searchBiblio.title, `%${query.search}%`),
          like(searchBiblio.topic, `%${query.search}%`),
          like(searchBiblio.author, `%${query.search}%`)
        )
      )
      .limit(6)
      .offset(Number(query.offset));

    if (res.length > 0) {
      results = res;
    } else {
      results = {
        status: 404,
        message: "Pencarian tidak ditemukan",
      };
    }
  } else if (query.search) {
    let res = await db
      .select()
      .from(searchBiblio)
      .where(
        or(
          like(searchBiblio.title, `%${query.search}%`),
          like(searchBiblio.topic, `%${query.search}%`),
          like(searchBiblio.author, `%${query.search}%`)
        )
      )
      .limit(6);

    if (res.length > 0) {
      results = res;
    } else {
      results = {
        status: 404,
        message: "Pencarian tidak ditemukan",
        query: query.search,
      };
    }
  } else if (query.offset) {
    let res = await db
      .select()
      .from(searchBiblio)
      .limit(6)
      .offset(Number(query.offset));

    if (res.length > 0) {
      results = res;
    } else {
      results = {
        status: 404,
        message: "Pencarian tidak ditemukan",
      };
    }
  } else {
    let res = await db
      .select()
      .from(searchBiblio)
      .where(
        or(
          like(searchBiblio.title, `%unpad%`),
          like(searchBiblio.topic, `%unpad%`),
          like(searchBiblio.author, `%unpad%`)
        )
      )
      // @ts-expect-error
      .where(and(isNotNull(searchBiblio.image), ne(searchBiblio.image, "")))
      .orderBy(sql`RAND()`)
      .limit(6);

    if (res.length > 0) {
      results = res;
    } else {
      results = {
        status: 404,
        message: "Pencarian tidak ditemukan",
        query: query.search,
      };
    }
  }

  return {
    status: event.node.res.statusCode,
    message: event.node.res.statusMessage,
    results: results,
  };
});
