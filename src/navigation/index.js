{/* navigation/index:
      activates react-native-paper UI components
*/}
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <PaperProvider>
      {/* check which route to take depending on if user is logged in or not */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}
