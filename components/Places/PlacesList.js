import { FlatList } from "react-native";

export const PlacesList = ({ places }) => {
  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={() => {}}
    />
  );
};
