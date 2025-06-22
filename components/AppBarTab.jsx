import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Link to={to} component={Pressable} style={styles.tab}>
      <Text color="white" fontWeight="bold">
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
