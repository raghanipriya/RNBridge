import {createStackNavigator} from '@react-navigation/stack';
import ZustandEmp from '../screens/zustandEmp';
import TurboModuleEmp from '../screens/turboModuleEmp';
import ReduxEmp from '../screens/reduxEmp';
import Form from '../screens/form';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="ZustandEmp" component={ZustandEmp} />
      <Stack.Screen name="ReduxEmp" component={ReduxEmp} />
      <Stack.Screen name="TurboModuleEmp" component={TurboModuleEmp} />
    </Stack.Navigator>
  );
}
