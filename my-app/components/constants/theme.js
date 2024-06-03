import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const colors = {
  gray: "#464555",
  lightGray: "#F1F1E6",
  black: "#000",
  primary: "#3B91F9",
  secondary: "#F05D82",
  white: "#FFF",
  dark: "#464555",
  light: "#F4F9FF",
  grey: "#a8a8a8",
  background: "#414756",
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  body: 14,
  caption: 12,
  radius: 16,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};
