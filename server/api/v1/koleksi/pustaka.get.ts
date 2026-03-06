export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const prodApiUrl = config.pustakaApiUrl as string;
  const prodApiKey = config.pustakaApiKey as string;
  const localApiUrl = config.pustakaLocalApiUrl as string;
  const localApiKey = config.pustakaLocalApiKey as string;

  if (!prodApiUrl || !prodApiKey) {
    throw createError({
      statusCode: 503,
      message: "Pustaka API is not configured",
    });
  }

  const { resource = "collections", id, ...params } = query;

  const buildEndpoint = (base: string) =>
    id ? `${base}/${resource}/${id}` : `${base}/${resource}`;

  const fetchWith = (baseUrl: string, apiKey: string) =>
    $fetch(buildEndpoint(baseUrl), {
      headers: { Authorization: `Bearer ${apiKey}` },
      ...(id ? {} : { query: params }),
    });

  try {
    // In dev, try local first; fall back to prod if local is unavailable
    if (import.meta.dev && localApiUrl && localApiKey) {
      try {
        return await fetchWith(localApiUrl, localApiKey);
      } catch {
        // Local API unavailable — fall through to prod
      }
    }
    return await fetchWith(prodApiUrl, prodApiKey);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? error?.statusCode ?? 500;
    throw createError({
      statusCode,
      message:
        error?.data?.message ??
        error?.message ??
        "Failed to fetch from Pustaka API",
    });
  }
});
