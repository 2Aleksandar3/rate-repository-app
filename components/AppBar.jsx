import { View, StyleSheet, ScrollView } from "react-native";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import Text from "./Text";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View>
          <AppBarTab to="/">Repositories</AppBarTab>
        </View>
        <View>
          <AppBarTab to="/signin">SignIn</AppBarTab>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
