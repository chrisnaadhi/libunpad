export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const getCommunityList = await fetch(
    `${config.public.dSpacePublic}core/communities`,
    {
      method: "get",
    }
  );
  const community = await getCommunityList.json();
  // const { communities } = communityList['_embedded'];

  return {
    community: community,
  };
});
