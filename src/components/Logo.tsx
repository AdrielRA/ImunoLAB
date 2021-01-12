import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Text from './Text';

type Props = ViewProps & {
  size?: number;
};

const Logo: React.FC<Props> = (props) => {
  const {size, style} = props;

  return (
    <View {...props} style={[style, styles.inline]}>
      <Text weight="black" style={{fontSize: size || 50}}>
        IMUNO
      </Text>
      <Text weight="black" color="primary" style={{fontSize: size || 50}}>
        LAB
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Logo;
