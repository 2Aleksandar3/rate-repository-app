import { View, StyleSheet, ScrollView, Pressable } from "react-native";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import Text from "./Text";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useQuery, useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: theme.colors.appBarBackground,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  tab: {
    fontSize: 20,
    color: "#fff",
    marginRight: 20,
  },

  scrollContainer: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/signin");
  };

  const isLoggedIn = data?.me;
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View>
          <AppBarTab to="/">Repositories</AppBarTab>
        </View>
        {isLoggedIn ? (
          <View>
            <AppBarTab onPress={handleSignOut}>Sign Out</AppBarTab>
          </View>
        ) : (
          <View>
            <AppBarTab to="/signin">Sign in</AppBarTab>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
