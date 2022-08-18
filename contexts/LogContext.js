import React, {createContext} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext('안녕하세요');

export const LogContextProvider = ({children}) => {
  const [logs, setLogs] = React.useState([]);
  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };
  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
