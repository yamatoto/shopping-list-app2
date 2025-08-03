// AndroidとWebでMaterialIconsを使用するためのフォールバック

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF SymbolsからMaterial Iconsへのマッピングをここに追加
 * - Material Iconsは[Icons Directory](https://icons.expo.fyi)で確認
 * - SF Symbolsは[SF Symbols](https://developer.apple.com/sf-symbols/)アプリで確認
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "list.bullet": "list",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as IconMapping;

/**
 * iOSではネイティブSF Symbols、AndroidとWebではMaterial Iconsを使用するアイコンコンポーネント
 * これによりプラットフォーム間で一貫した外観と最適なリソース使用を保証
 * アイコン名はSF Symbolsベースで、Material Iconsへの手動マッピングが必要
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
