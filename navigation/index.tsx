/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import MatchMakingScreen from '../screens/MatchMakingScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MatchMakingPopout from '../components/MatchMakingPopout';
import InputInfoScreen from '../screens/InputInfoScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight:'bold',
      }
    }}>
      <Stack.Screen 
        name="Root" 
        component={BottomTabNavigator} 
        options={{ 
          title: "<AppName>",
          headerRight: () =>  (
            <View style={{flexDirection: 'row', marginRight: 0}}>
              <Entypo name="dots-three-horizontal" size={24} color="white" />
            </View>
          ),
          headerShown: false
        }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="InputInfo" component={InputInfoScreen} options={{ title: 'Edit Profile' }}/>
        {/* <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile'}}/> */}
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="MatchMaking"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelStyle: {
          fontWeight: 'bold'
        },
        headerShown: true,
      }}>
      <BottomTab.Screen
        name="MatchMaking"
        component={MatchMakingScreen}
        options={({ navigation }: RootTabScreenProps<'MatchMaking'>) => ({
          title: 'Matching',
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: Colors.light.background,
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-friends" size={24} color={color} />,
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 15}}>
              <Pressable
                onPress={() => navigation.navigate('InputInfo')} //it was 'Modal' screen previously
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome name="edit" size={25} color={Colors.light.background} style={{ marginRight: 15 }}/>
              </Pressable>
              <MatchMakingPopout/>            
            </View>
          ),
          tabBarLabel: () => null,
        })}
      />
      <BottomTab.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route?.params?.name,
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: Colors.light.background,
          tabBarIcon: ({ color }) => <Entypo name="chat" size={24} color={color} />,
          tabBarLabel: () => null,
          headerRight: () =>  (
            <View style={{flexDirection: 'row', marginRight: 15}}>
              <Entypo name="dots-three-horizontal" size={24} color={Colors.light.background} />
            </View>
          ),
          
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
