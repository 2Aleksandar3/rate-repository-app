import { useQuery } from "@apollo/client";
import { GET_ONE_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first = 3) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id, first },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    console.log(" Current pageInfo:", data?.repository?.reviews?.pageInfo);
    console.log(" Reviews fetched:", data?.repository?.reviews?.edges?.length);
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    console.log(" canFetchMore:", canFetchMore);

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        id,
        first,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
