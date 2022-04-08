import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const icon_color = '#586069';
const icon_size = 15;

type Props = {};
export default class IconButton extends Component<Props> {
  constructor(props) {
    super(props);
    this.rotateValue = new Animated.Value(0);
  }
  render() {
    const {icon, onPress, data} = this.props;
    let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    let transformStyle = {transform: [{rotate: rotation}]};
    const onPressIn = () => {
      Animated.timing(this.rotateValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
      onPress(data);
    };

    const onPressOut = () => {
      Animated.timing(this.rotateValue, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          onPressIn();
        }}
        onPressOut={() => {
          onPressOut();
        }}>
        <Animated.View style={transformStyle}>
          <Icon
            name={icon}
            style={styles.icon}
            size={icon_size}
            color={icon_color}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};
