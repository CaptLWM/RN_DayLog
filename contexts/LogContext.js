import React, {createContext, useEffect, useRef} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

const LogContext = createContext('안녕하세요');

export const LogContextProvider = ({children}) => {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = React.useState(
    Array.from({length: 10})
      .map((_, index) => ({
        id: uuidv4(),
        title: `Log ${index}`,
        body: `Log ${index}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
  );
  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };
  const onModify = modified => {
    // logs 배열을 순화해 id가 일치하면 log를 교체, 그렇지 않으면 유지
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };
  const onRemove = id => {
    const nextLogs = logs.filter(log => log.id !== id);
    // 특정 id를 제외한 항목들로 구성된 새로운 배열 생성해 상태 업데이트, 불변성 유지하면서 배열 업데이트
    setLogs(nextLogs);
  };

  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);
  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
