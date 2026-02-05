import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import {Provider} from 'react-redux'; // Import Provider
import {store} from '../../store/toolkit/store'; // Import Store
import {useReduxEmp} from './useReduxEmp';
import {SpareReplacementItem} from '../../types/spareTypes';

function ReduxEmpContent(): React.JSX.Element {
  console.log('Rendering <ReduxEmp /> Screen'); // Log for tracking
  const {states, handlers} = useReduxEmp();

  const renderItems: ListRenderItem<SpareReplacementItem> = ({item, index}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handlers.handleDetails(item?.name)}>
        <Text style={styles.textStyle}>{item?.name} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlers.handleDelete(item?.name)}>
        <Text>{'Delete'} </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={states.spareItems}
        renderItem={renderItems}
        keyExtractor={item => item.name}
      />
      <TouchableOpacity onPress={handlers.handleAddSpare}>
        <Text>Add Spare</Text>
      </TouchableOpacity>
      {states.loading && (
        <ActivityIndicator
          color={'red'} // Changed color to Red for Redux
          size={'large'}
          style={styles.loadingStyle}
        />
      )}
    </View>
  );
}

// Wrap with Provider for isolation
function ReduxEmp() {
  return (
    <Provider store={store}>
      <ReduxEmpContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 1,
  },
  textStyle: {
    fontSize: 20,
    marginVertical: 1,
    flex: 1,
  },
  loadingStyle: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default ReduxEmp;
