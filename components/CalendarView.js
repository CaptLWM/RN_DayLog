import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarView = ({markedDates, selectedDate, onSelectedDate}) => {
  // 현재 연/월 사용하기
  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      onDayPress={day => {
        onSelectedDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderBottomwidth: 1,
    borderBottomColor: '#e0e0e0,',
  },
});

export default CalendarView;
