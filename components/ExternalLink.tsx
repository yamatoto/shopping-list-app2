import { Href, Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: Href & string;
};

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // ネイティブでデフォルトブラウザに遷移するデフォルト動作を防止
          event.preventDefault();
          // アプリ内ブラウザでリンクを開く
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
