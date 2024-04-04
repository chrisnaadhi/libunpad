import { eq, like, or } from "drizzle-orm";
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
          like(searchBiblio.title, `${query.search}`),
          like(searchBiblio.topic, `${query.search}`),
          like(searchBiblio.author, `${query.search}`)
        )
      )
      .limit(30)
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
          like(searchBiblio.title, `${query.search}`),
          like(searchBiblio.topic, `${query.search}`),
          like(searchBiblio.author, `${query.search}`)
        )
      )
      .limit(30);

    if (res.length > 0) {
      results = res;
    } else {
      results = {
        status: 404,
        message: "Pencarian tidak ditemukan",
      };
    }
  } else if (query.offset) {
    let res = await db
      .select()
      .from(searchBiblio)
      .limit(30)
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
    results = {
      status: 400,
      message: "Bad Request. You should add keyword query",
    };
  }

  return {
    status: event.node.res.statusCode,
    message: event.node.res.statusMessage,
    results: results,
  };
});
