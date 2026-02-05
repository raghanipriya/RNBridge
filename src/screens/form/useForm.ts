import {useState, useRef} from 'react';
import {TextInput} from 'react-native';

export type FormValues = {
  serviceCallId: string;
  mainSerialNo: string;
  itemName: string;
  isBillable: string;
  isFoc: string;
  spareItem: string;
  oldSparePartName: string;
  oldSparePartSerialNo: string;
  isOldSpareReceived: string;
  newSpareItem: string;
  newSparePartName: string;
  newSparePartSerialNo: string;
  rate: string;
  amount: string;
  remark: string;
  underWarranty: string;
  underAmc: string;
  amcType: string;
};

export const useForm = () => {
  const refs = useRef<Record<keyof FormValues, TextInput | null>>({} as any);

  const [values, setValues] = useState<FormValues>({
    serviceCallId: '',
    mainSerialNo: '',
    itemName: '',
    isBillable: '',
    isFoc: '',
    spareItem: '',
    oldSparePartName: '',
    oldSparePartSerialNo: '',
    isOldSpareReceived: '',
    newSpareItem: '',
    newSparePartName: '',
    newSparePartSerialNo: '',
    rate: '',
    amount: '',
    remark: '',
    underWarranty: '',
    underAmc: '',
    amcType: '',
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const handleInputChange = (key: keyof FormValues, text: string) => {
    setValues(prev => ({...prev, [key]: text}));
    if (errors[key]) {
      setErrors(prev => ({...prev, [key]: ''}));
    }
  };

  const handleErrorChange = (key: keyof FormValues, error: string) => {
    setErrors(prev => ({...prev, [key]: error}));
  };

  const validateFunc = () => {
    let isValid = true;
    const newErrors: Partial<FormValues> = {};
    let firstErrorKey: keyof FormValues | null = null;

    (Object.keys(values) as Array<keyof FormValues>).forEach(key => {
      if (!values[key].trim()) {
        isValid = false;
        newErrors[key] = `${key} is required`; // You might want deeper formatting for label names
        if (!firstErrorKey) {
          firstErrorKey = key;
        }
      }
    });

    setErrors(newErrors);

    if (firstErrorKey && refs.current[firstErrorKey]) {
      (refs.current[firstErrorKey] as TextInput).focus();
    }

    return isValid;
  };

  const handlers = {
    handleInputChange,
    handleErrorChange,
    validateFunc,
  };

  return {values, errors, refs, handlers};
};
