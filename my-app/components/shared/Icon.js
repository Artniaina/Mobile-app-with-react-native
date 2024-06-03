import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import icons from "../constants/icon"

const Icon = ({onPress, icon, containerStyle, viewStyle, style, size = 32}) => {
  const image = (
    <View style={viewStyle}>
      <Image
        source={icons[icon]}
        style={[{width: size, height: size, resizeMode: 'cover'}, style]}
      />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        {image}
      </TouchableOpacity>
    );
  }
  return <View style={containerStyle}>{image}</View>;
};

export default Icon;
