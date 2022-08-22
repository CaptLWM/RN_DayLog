import React, {useContext} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchContext from '../contexts/SearchContext';

const SearchHeader = () => {
  const {width} = useWindowDimensions();
  const {keyword, onChangeText} = useContext(SearchContext);
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChangeText={onChangeText}
        autoFocus
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => onChangeText('')}>
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;

// 화면 크기 조회
// 1. Dimensions.get : window를 이용해 화면 전체 크기 가져올 수 있음, 함수컴포넌트 외부에서도 사용 가능,
//                     안드로이드(상단의 상태바와 하단의 소프트 메뉴 바 영역 제외한 크기 반환)와 ios 차이 고려해야함
// 2. useWindowDimensions : 화면 크기 변화에 대비할 필요 없음, hook, 함수컴포넌트 내부에서만 사용 가능, 전체화면 가져오기 불가
