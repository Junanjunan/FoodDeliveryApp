import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Pressable, Text, TouchableHighlight, View} from 'react-native';
import {useCallback} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;    // react navigation에서 정해준 타입 지정하는 방법은 react navigation에서 정해준 방식대로 타입 지정(타입스크립트와 좀 다르더라도)
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;   

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
      <>
        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Pressable onPress={onClick}>
            <Text>Home Screen</Text>
          </Pressable>
      </View>
      <View style={{flex:1, backgroundColor: 'orange'}}><Text>Second</Text></View>
      </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight onPress={onClick}>
              <Text>Details Screen</Text>
            </TouchableHighlight>
          </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{title: 'Overview', headerShown: false}}
              />
              <Stack.Screen name="Details">
                {props => <DetailsScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
  );
}

export default App;