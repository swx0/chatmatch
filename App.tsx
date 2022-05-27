import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { MenuProvider } from 'react-native-popup-menu';
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import { useEffect } from 'react';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import React from 'react';

Amplify.configure(awsconfig);


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // when App first renders
  useEffect(() => {
    const fetchUser = async () => {
      // get user from Auth
      const userDataAuth = await Auth.currentAuthenticatedUser({ bypassCache: true });
      
      // if user from Auth is successfully fetched
      if (userDataAuth) {
        // fetch this user(using sub as id) from db, if not found in db, add new user to db
        const userDataDB = await API.graphql(graphqlOperation(getUser, { id: userDataAuth.attributes.sub }));
        console.log(userDataDB);

        // Check if user is in db
        if (userDataDB.data.getUser) {
          console.log("User already registered")
          return;
        }
        
        const newUser = {
          id: userDataAuth.attributes.sub,
          name: userDataAuth.username,
          imageUri:"https://cdn-icons-png.flaticon.com/512/1/1247.png",
        }

        // Add new user to db
        await API.graphql(graphqlOperation(createUser, { input: newUser }));


      }

      
    }

    fetchUser();
  }, []);

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

