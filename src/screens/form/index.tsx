import React from 'react';
import {Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import AppInput from '../../components/appInput';
import {useForm} from './useForm';

// Wrap with Provider for isolation
function Form() {
  const {values, errors, refs, handlers} = useForm();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Spare Form</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['serviceCallId'] = ref; }}
          placeholder="Service Call ID"
          value={values.serviceCallId}
          error={errors.serviceCallId}
          onChangeText={(text) => handlers.handleInputChange('serviceCallId', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['mainSerialNo'] = ref; }}
          placeholder="Main Serial No"
          value={values.mainSerialNo}
          error={errors.mainSerialNo}
          onChangeText={(text) => handlers.handleInputChange('mainSerialNo', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['itemName'] = ref; }}
          placeholder="Item Name"
          value={values.itemName}
          error={errors.itemName}
          onChangeText={(text) => handlers.handleInputChange('itemName', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['isBillable'] = ref; }}
          placeholder="Is Billable"
          value={values.isBillable}
          error={errors.isBillable}
          onChangeText={(text) => handlers.handleInputChange('isBillable', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['isFoc'] = ref; }}
          placeholder="Is FOC"
          value={values.isFoc}
          error={errors.isFoc}
          onChangeText={(text) => handlers.handleInputChange('isFoc', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['spareItem'] = ref; }}
          placeholder="Spare Item"
          value={values.spareItem}
          error={errors.spareItem}
          onChangeText={(text) => handlers.handleInputChange('spareItem', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['oldSparePartName'] = ref; }}
          placeholder="Old Spare Part Name"
          value={values.oldSparePartName}
          error={errors.oldSparePartName}
          onChangeText={(text) => handlers.handleInputChange('oldSparePartName', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['oldSparePartSerialNo'] = ref; }}
          placeholder="Old Spare Part Serial No"
          value={values.oldSparePartSerialNo}
          error={errors.oldSparePartSerialNo}
          onChangeText={(text) => handlers.handleInputChange('oldSparePartSerialNo', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['isOldSpareReceived'] = ref; }}
          placeholder="Is Old Spare Received"
          value={values.isOldSpareReceived}
          error={errors.isOldSpareReceived}
          onChangeText={(text) => handlers.handleInputChange('isOldSpareReceived', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['newSpareItem'] = ref; }}
          placeholder="New Spare Item"
          value={values.newSpareItem}
          error={errors.newSpareItem}
          onChangeText={(text) => handlers.handleInputChange('newSpareItem', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['newSparePartName'] = ref; }}
          placeholder="New Spare Part Name"
          value={values.newSparePartName}
          error={errors.newSparePartName}
          onChangeText={(text) => handlers.handleInputChange('newSparePartName', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['newSparePartSerialNo'] = ref; }}
          placeholder="New Spare Part Serial No"
          value={values.newSparePartSerialNo}
          error={errors.newSparePartSerialNo}
          onChangeText={(text) => handlers.handleInputChange('newSparePartSerialNo', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['rate'] = ref; }}
          placeholder="Rate"
          value={values.rate}
          error={errors.rate}
          onChangeText={(text) => handlers.handleInputChange('rate', text)}
          keyboardType="numeric"
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['amount'] = ref; }}
          placeholder="Amount"
          value={values.amount}
          error={errors.amount}
          onChangeText={(text) => handlers.handleInputChange('amount', text)}
          keyboardType="numeric"
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['remark'] = ref; }}
          placeholder="Remark"
          value={values.remark}
          error={errors.remark}
          onChangeText={(text) => handlers.handleInputChange('remark', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['underWarranty'] = ref; }}
          placeholder="Under Warranty"
          value={values.underWarranty}
          error={errors.underWarranty}
          onChangeText={(text) => handlers.handleInputChange('underWarranty', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['underAmc'] = ref; }}
          placeholder="Under AMC"
          value={values.underAmc}
          error={errors.underAmc}
          onChangeText={(text) => handlers.handleInputChange('underAmc', text)}
        />
        <AppInput
          ref={(ref: TextInput | null) => { refs.current['amcType'] = ref; }}
          placeholder="AMC Type"
          value={values.amcType}
          error={errors.amcType}
          onChangeText={(text) => handlers.handleInputChange('amcType', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handlers.validateFunc} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Form;
