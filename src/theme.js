import { Platform } from "react-native";
const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    background: "#e1e4e8",
    appBarBackground: "#24292e",
    white: "#ffffff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },

  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
