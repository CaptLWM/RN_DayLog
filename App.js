import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import LogContext, {LogContextProvider} from './contexts/LogContext';
import {SearchContextProvider} from './contexts/SearchContext';
import RootStack from './screens/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
      {/** 순서 중요하지 않음, 의존관계 아니기 때문*/}
    </NavigationContainer>
  );
};

export default App;
