import React, {useEffect} from 'react';
import {Animated, Button, Easing, StyleSheet, View} from 'react-native';

// Animated.timing(animation, {
//   toValue:0,  // 어떤 값으로 변경할지 - 필수
//   duration : 1000, // 애니메이션에 걸리는 시간(밀리세컨드) - 기본값:500
//   delay:0, // 딜레이 이후 애니메이션 시작 - 기본값:0
//   useNativeDriver:true, // 네이티브 드라이버 사용 여부 - 필수, 레이아웃과 곤련없는 스타일에 적용 가능
// left, width, paddingLeft, marginLeft 등에서는 false
//   isInteraction : true, // 사용자 인터랙셔내에 의해 시작한 애니메이션인지 지정 - 기본값:true,
//   easing:Easing.inOut(Easing.ease),
// }).start(()=>{
//   // 애니메이션 처리 완료 후 실행할 작업
// })

const FadeInAndOut = () => {
  const animation = React.useRef(new Animated.Value(1)).current;
  const [enabled, setEnabled] = React.useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Button
        title="Toggle"
        onPress={() => {
          setEnabled(!enabled);
        }}
      />
    </View>
  );
};

const CalendarScreen = () => {
  return (
    <View style={styles.block}>
      <FadeInAndOut />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {},
  rectangle: {width: 100, height: 100, backgroundColor: 'black'},
});

export default CalendarScreen;
