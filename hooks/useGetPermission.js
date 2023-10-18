import { Alert } from "react-native";

export const useGetPermission = (type, permissionHook, permissionStatus) => {
  const [permissionInfo, requestPermission] = permissionHook();

  const verifyPermissions = async () => {
    if (permissionInfo.status === permissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (permissionInfo.status === permissionStatus.DENIED) {
      Alert.alert(
        "Insufficent Permissions!",
        `You need to grant ${type} permissions to use this app.`
      );

      return false;
    }

    return true;
  };

  return { verifyPermissions };
};
