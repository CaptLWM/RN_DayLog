import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FloatingWriteButton = ({hidden}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Write');
  };

  const animation = React.useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   Animated.timing(animation, {
  //     toValue: hidden ? 1 : 0,
  //     useNativeDriver: true,
  //   }).start;
  // }, [animation, hidden]);

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      tension: 45,
      friction: 5,
    }).start();
  }, [animation, hidden]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{color: 'white'}}
        onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
};

// Pressable : Touchable* 과 유사, RN 0.63에 새로 도입

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute', // 컴포넌트 위치 left,right, bottom, top으로 설정 가능
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    // ios 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 안드로이드 전용 그림자 설정
    elevation: 5,
    // 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
    // ios에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWriteButton;
