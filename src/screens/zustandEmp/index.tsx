import React, {useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
  Button,
} from 'react-native';
import {useZustandEmp} from './useZustandEmp';
import {CountryResp, SpareReplacementItems} from '../../types/spareTypes';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import crashlytics from '@react-native-firebase/crashlytics';

function ZustandEmp(): React.JSX.Element {
  const {states, handlers} = useZustandEmp();

  const renderItems: ListRenderItem<SpareReplacementItems> = useCallback(
    ({item, index}) => (
      <View style={styles.childCard}>
        <TouchableOpacity onPress={() => handlers.handleDetails(item?.name)}>
          <Text style={styles.textStyle}>{item?.name} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlers.handleDelete(item?.name)}>
          <Text>{'Delete'} </Text>
        </TouchableOpacity>
      </View>
    ),
    [handlers],
  );

  if (states.loading) {
    // ⚡ FIX: Use fixed skeleton count (e.g. 6) to show loader when list is empty
    const array = new Array(10).fill(0);
    return (
      <View style={{paddingTop: 20}}>
        {array.map((_, index: number) => (
          <ContentLoader
            key={index}
            speed={1.2}
            width={'100%'}
            height={70}
            backgroundColor={'#c7c3c3'}
            foregroundColor={'#e9e3e3'}>
            <Rect x="10" y="5" rx="8" ry="8" width="370" height="60" />
          </ContentLoader>
        ))}
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={states.spareItems}
        renderItem={renderItems}
        keyExtractor={(item, index) => item.name || index.toString()}
        onEndReached={handlers.onEndReached}
        initialNumToRender={20}
        refreshing={states.refreshing}
        onRefresh={handlers.handleRefresh}
      />
      <TouchableOpacity
        onPress={handlers.handleAddSpare}
        style={{padding: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'blue'}}>Add Spare</Text>
      </TouchableOpacity>
      {/* {states.loading && (
        <ActivityIndicator
          color={'blue'}
          size={'large'}
          style={styles.loadingStyle}
        />
      )} */}
    </View>
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
  childCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderColor: '#57AEFE',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});

export default ZustandEmp;
