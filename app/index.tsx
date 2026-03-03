import { TipTapEditor } from "@/components/tipTapEditor2";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import React from "react";
import { Platform, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <TipTapEditor
        name="Tasfique"
        onSave={(content) => {
          //console.log("Editor content saved:", content);
          alert("Content saved successfully!");
        }}
        onExport={async (markdown) => {
          try {
            const fileName = `document_${Date.now()}.md`;

            if (Platform.OS === "android") {
              const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

              if (permissions.granted) {
                const fileUri =
                  await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    fileName,
                    "text/markdown",
                  );
                await FileSystem.writeAsStringAsync(fileUri, markdown);
                alert("File saved successfully to your device!");
              }
            } else {
              // iOS standard sharing (Save to Files)
              const filename = `${FileSystem.cacheDirectory}${fileName}`;
              await FileSystem.writeAsStringAsync(filename, markdown);
              await Sharing.shareAsync(filename);
            }
          } catch (error: any) {
            alert(error.message);
          }
        }}
      />
    </View>
  );
}
