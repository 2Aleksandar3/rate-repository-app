import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import Constants from "expo-constants";
import { relayStylePagination } from "@apollo/client/utilities";

const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({
    uri: `${Constants.expoConfig.extra.apolloUri}`,
  });

  const authLink = new ApolloLink(async (operation, forward) => {
    const accessToken = await authStorage.getAccessToken();

    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Repository: { fields: { reviews: relayStylePagination() } },
      },
    }),
  });
};

export default createApolloClient;
