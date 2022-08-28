import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransParentCircleButton from './TransParentCircleButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const WriteHeader = ({onSave, onAskRemove, isEditing, date, onChangeDate}) => {
  const navigation = useNavigation();
  const onGoBack = () => {
    navigation.pop();
  };

  const [mode, setMode] = React.useState('date');
  const [visible, setVisible] = React.useState(false);

  const onPressDate = () => {
    setMode('date');
    setVisible(true);
  };

  const onPressTime = () => {
    setMode('time');
    setVisible(true);
  };

  const onConfirm = selectedDate => {
    setVisible(false);
    onChangeDate(selectedDate);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransParentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <TransParentCircleButton
            hasMarginRight
            name="delete-forever"
            color="#ef5350"
            onPress={onAskRemove}
          />
        )}
        <TransParentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>
      <View style={styles.center}>
        <Pressable onPress={onPressDate}>
          <Text>
            {format(new Date(date), 'PPP', {
              locale: ko,
            })}
          </Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={onPressTime}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
