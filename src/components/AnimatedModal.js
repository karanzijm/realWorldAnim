import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import Header from './Header';
const {height, width} = Dimensions.get('window');

type Props = {};
export default class AnimatedModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.ytranslate = new Animated.Value(0);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible) {
      this.ytranslate.setValue(0);
      Animated.spring(this.ytranslate, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.ytranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }
  render() {
    const {title, image, children, onClose} = this.props;
    let bottomStyle = this.props.visible ? {bottom: 0} : {bottom: -height - 15};
    let negativeHeight = -height + 20;
    let modalMoveY = this.ytranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight],
    });

    let translateStyle = {transform: [{translateY: modalMoveY}]}; // translateY is the transform for moving objects vertically

    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <Header title={title}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Header>
        <View style={styles.modalContent}>{children}</View>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 30,
  },
  closeText: {
    fontSize: 17,
    color: '#fff',
  },
};
