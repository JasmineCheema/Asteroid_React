import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/HomeScreen';
import Details from './screens/DetailScreen';
import RandomScreen from './screens/RandomScreen';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Details' component={Details}/>
        <Stack.Screen name='Random' component={RandomScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack=createStackNavigator()