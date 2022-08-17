import React, {createContext} from 'react';

const LogContext = createContext('안녕하세요');

export const LogContextProvider = ({children}) => {
  const [text, setText] = React.useState('');
  return (
    <LogContext.Provider value={{text, setText}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
