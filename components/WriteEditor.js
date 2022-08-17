import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const WriteEditor = ({title, body, onChangeTitle, onChangeBody}) => {
  const bodyRef = React.useRef();
  // useRef : 함수 컴포넌트에서 컴포넌트 레퍼런스를 선택할 수 있게 하는 Hook
  // 제목 입력하고 enter 누르면 하단 내용으로 포커스를 이동시킬때 사용
  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          bodyRef.current.focus();
          // .current로 useRef로 선택한 값을 조회 가능
        }}
      />
      <TextInput
        placeholder="당신의 오늘을 기록해보세요"
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeBody}
        value={body}
        ref={bodyRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, padding: 16},
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});
export default WriteEditor;
