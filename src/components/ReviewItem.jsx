import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
  },
  topSection: {
    flexDirection: "row",
    marginBottom: 10,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
  content: {
    flexShrink: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  date: {
    color: "#586069",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#0366d6",
    flexGrow: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#d73a4a",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const ReviewItem = ({ review, showActions, onViewRepository, onDelete }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");
  const displayName =
    review.user?.username ?? review.repository?.fullName ?? "Unknown";

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.username}>{displayName}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onViewRepository}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
