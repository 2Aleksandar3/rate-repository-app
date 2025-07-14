import { View, Image, StyleSheet, Button } from "react-native";
import theme from "../theme";
import Text from "./Text";
import * as Linking from "expo-linking";

const formatCount = (count) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  statItem: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
});

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
  const openInGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text fontWeight="bold">{repository.fullName}</Text>
          <Text>{repository.description}</Text>
          <Text style={styles.languageTag}>{repository.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(repository.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{repository.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
      {showGitHubButton && (
        <View style={{ marginTop: 15 }}>
          <Button title="Open in GitHub" onPress={openInGitHub} />
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
