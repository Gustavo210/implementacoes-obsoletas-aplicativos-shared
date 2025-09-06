import { legacyTheme } from "./utils/legacyTheme";

declare module "styled-components/native" {
  type ThemeType = typeof legacyTheme;

  export interface DefaultTheme extends ThemeType {}
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    type PropsEventoVoltar = EventArg<
      "beforeRemove",
      true,
      {
        action: Readonly<{
          type: string;
          payload?: object;
          source?: string;
          target?: string;
        }>;
      }
    >;
  }
}
