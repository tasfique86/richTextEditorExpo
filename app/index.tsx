import { TipTapEditor } from "@/components/tipTap2";
import React from "react";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <TipTapEditor
        name="Tasfique"
        onSave={(content) => {
          //console.log("Editor content saved:", content);
          alert("Content saved successfully!");
        }}
      />
    </View>
  );
}
