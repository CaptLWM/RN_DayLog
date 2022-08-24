import React, {useContext, useEffect} from 'react';
import CalendarView from '../components/CalendarView';
import LogContext from '../contexts/LogContext';
import {format} from 'date-fns';
import FeedList from '../components/FeedList';

// useMemo
// 메모제이션 : 동일한 계산을 반복해야 할 때 불필요한 연산을 제거하기 위해 이전에 계산한 값을 재사용해 처리를 최적화하는 것을 의미
const CalendarScreen = () => {
  const {logs} = useContext(LogContext);
  const [selectedDate, setSelectedDate] = React.useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = React.useMemo(
    () =>
      logs.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {}),
    [logs],
  );
  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );
  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectedDate={setSelectedDate}
        />
      }
    />
  );
};

export default CalendarScreen;
