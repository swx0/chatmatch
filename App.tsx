import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { MenuProvider } from 'react-native-popup-menu';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
Amplify.configure(awsconfig)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <MenuProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </MenuProvider>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)

