{/* navigation/index:
      activates react-native-paper UI components
*/}
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './Routes';

export default function Providers() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
