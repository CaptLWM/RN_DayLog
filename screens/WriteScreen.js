import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogContext from '../contexts/LogContext';

const WriteScreen = ({route}) => {
  const log = route.params?.log;
  const [title, setTitle] = React.useState(log?.title ?? '');
  const [body, setBody] = React.useState(log?.body ?? '');
  const navigation = useNavigation();
  const [date, setDate] = React.useState(log ? newDate(log.date) : new Date());
  const {onCreate, onModify, onRemove} = useContext(LogContext);

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        date: date.toISOString(),
        title,
        body,
      });
    } else {
      onCreate({
        title,
        body,
        // 날짜를 문자열로 변환
        date: date.toISOString(),
      });
    }
    navigation.pop();
  };

  const onAskRemove = () => {
    Alert.alert('삭제', '정말로 삭제하시겠어요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        onPress: () => {
          onRemove(log?.id);
          navigation.pop();
        },
        style: 'destructive',
      },
      {
        cancelable: true,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // 화면에 보여줄 수 있는 줄 수 초과할 경우 하단내용 잘림 방지(IOS)
      >
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
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
