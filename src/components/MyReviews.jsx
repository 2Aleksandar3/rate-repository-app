import React from "react";
import {
  FlatList,
  Text,
  View,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = (id) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (confirmed) {
        deleteReview({ variables: { id } });
      }
    } else {
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteReview({ variables: { id } });
                refetch();
              } catch (e) {
                console.error("Error deleting review:", e);
              }
            },
          },
        ]
      );
    }
  };

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showActions={true}
          onViewRepository={() => navigate(`/repository/${item.repository.id}`)}
          onDelete={() => handleDelete(item.id)}
        />
      )}
    />
  );
};

export default MyReviews;
