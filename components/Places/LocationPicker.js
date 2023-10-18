import { Alert, StyleSheet, View } from "react-native";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { OutlinedButton } from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useGetPermission } from "../../hooks/useGetPermission";

export const LocationPicker = () => {
  const { verifyPermissions } = useGetPermission(
    "location",
    useForegroundPermissions,
    PermissionStatus
  );

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
  };

  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>

        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
