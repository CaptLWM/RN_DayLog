import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogContext from '../contexts/LogContext';

const WriteScreen = () => {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const navigation = useNavigation();
  const {onCreate} = useContext(LogContext);

  const onSave = () => {
    onCreate({
      title,
      body,
      // 날짜를 문자열로 변환
      date: new Date().toISOString(),
    });
    navigation.pop();
  };
  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // 화면에 보여줄 수 있는 줄 수 초과할 경우 하단내용 잘림 방지(IOS)
      >
        <WriteHeader onSave={onSave} />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
