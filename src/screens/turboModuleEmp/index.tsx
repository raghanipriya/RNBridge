import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NativeLocalStorage from '../../../specs/NativeLocalStorage';
import NativeBatteryLevel from '../../../specs/NativeBatteryLevel';

const {BatteryModule} = NativeModules;

const EMPTY = '<empty>';

function TurboModuleEmp(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  function getBatteryLevel() {
    const level = NativeBatteryLevel.getBatteryLevel();
    Alert.alert(`Your phone's battery level is ${level}`);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
      <Button title="Check bettery" onPress={getBatteryLevel} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  buttonStyle: {
    marginVertical: 12,
  },
  textStyle: {
    fontSize: 20,
    marginVertical: 1,
  },
});

export default TurboModuleEmp;
