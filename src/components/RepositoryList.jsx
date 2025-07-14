import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    margin: 10,
    backgroundColor: "white",
  },
  input: {
    margin: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ selectedOrder, setSelectedOrder }) => (
  <View style={styles.picker}>
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(value) => setSelectedOrder(value)}
    >
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST" />
    </Picker>
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <>
          <TextInput
            placeholder="Search repositories..."
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            style={styles.input}
          />
          <OrderPicker
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        </>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("LATEST");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  let orderBy = "CREATED_AT";
  let orderDirection = "DESC";

  if (selectedOrder === "HIGHEST") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "DESC";
  } else if (selectedOrder === "LOWEST") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "ASC";
  }

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
