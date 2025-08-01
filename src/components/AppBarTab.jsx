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

const AppBarTab = ({ to, onPress, children }) => {
  if (to) {
    return (
      <Link to={to} component={Pressable} style={styles.tab}>
        <Text color="white" fontWeight="bold">
          {children}
        </Text>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text color="white" fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
