import React, {createContext} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext('안녕하세요');

export const LogContextProvider = ({children}) => {
  const [logs, setLogs] = React.useState(
    Array.from({length: 10})
      .map((_, index) => ({
        id: uuidv4,
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
  return (
    <LogContext.Provider value={{logs, onCreate, onModify}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
