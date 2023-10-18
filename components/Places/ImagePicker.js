import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useGetPermission } from "../../hooks/useGetPermission";
import { OutlinedButton } from "../ui/OutlinedButton";

export const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState("");
  const { verifyPermissions } = useGetPermission(
    "camera",
    useCameraPermissions,
    PermissionStatus
  );

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
  };

  let imagePrevew = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePrevew = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePrevew}</View>
      <OutlinedButton
        icon="camera"
        title="Take Image"
        onPress={takeImageHandler}
      >
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
