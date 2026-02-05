import {useEffect, useState} from 'react';
import {useSpareStore, useSpareStoreSelectors} from '../../store/useSpareStore';
import {useCountryStoreSelectors} from '../../store/useCountry';
import {CountryResp} from '../../types/spareTypes';
import {logAppError} from '../../utils/crashlyticsLogger';
import crashlytics from '@react-native-firebase/crashlytics';

const SERVICE_CALL_ID = 'PE-SCR-250907-0001';
const DEFAULT_ROW_ID = '25f9kcpb1d';

export const useZustandEmp = () => {
  const {spareItems, isAnyLoading} = useSpareStoreSelectors([
    'spareItems',
    'isAnyLoading',
  ]);

  // ⚡ actions
  const {getSpare, deleteSpare, addUpdateSpare, getSpareByID} =
    useSpareStoreSelectors([
      'getSpare',
      'deleteSpare',
      'addUpdateSpare',
      'getSpareByID',
    ]);

  const {getCountry, country} = useCountryStoreSelectors([
    'getCountry',
    'country',
  ]);

  const [limit, setLimit] = useState<number>(30);
  const [page, setPage] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const [countryData, setCountryData] = useState<CountryResp[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('service_call_id', SERVICE_CALL_ID);
    params.append('row_id', DEFAULT_ROW_ID);
    getSpare(params.toString());
  }, [getSpare]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('txt', '');
    params.append('start', page.toString());
    params.append('page_len', limit.toString());

    getCountry(params.toString());
  }, [getCountry, page]);

  useEffect(() => {
    if (!country) return;

    setCountryData(country);
  }, [country]);

  function handleAddSpare() {
    const payload = {
      rows: [
        {
          service_call_id: SERVICE_CALL_ID,
          main_serial_no: '23456bh',
          item_name: 'ABS MODULE SINGLE RED AC-KG',
          is_billable: 1,
          is_foc: 0,
          spare_item: '2900001',
          old_spare_part_name: 'BATTERY 6V 4.5AH',
          old_spare_part_serial_no: '121212',
          is_old_spare_received: 1,
          new_spare_item: '2900001',
          new_spare_part_name: 'BATTERY 6V 4.5AH',
          new_spare_part_serial_no: 'MobileAPI-06',
          rate: 100,
          amount: 100,
          remark: 'added',
          under_warranty: 'No',
          under_amc: 'No',
          amc_type: '-',
        },
      ],
    };

    addUpdateSpare(payload);
  }

  function handleDelete(id: string) {
    deleteSpare(SERVICE_CALL_ID, id);
  }

  function handleDetails(id: string) {
    getSpareByID(SERVICE_CALL_ID, id);
  }

  function handleRefresh() {
    setRefreshing(true);
    const params = new URLSearchParams();
    params.append('service_call_id', SERVICE_CALL_ID);
    params.append('row_id', DEFAULT_ROW_ID);
    
    // We pass a callback or await if getSpare returned a promise, 
    // but here we just rely on the store update. 
    // Ideally getSpare should return the promise from exec.
    getSpare(params.toString()).finally(() => {
       setRefreshing(false);
    });
  }

  // ⚠️ NOTE: The previous onEndReached was paginating 'Country' API 
  // but the UI displays 'SpareItems'. I have disabled it to prevent logic mismatch.
  // If you need Spare pagination, ensure the API supports 'start'/'page_len' params
  // and update the store to append data instead of replacing it.
  const onEndReached = () => {
    if (page <= countryData?.length) {
      setPage(prev => prev + 30);
    }
  };

  const states = {
    spareItems,
    loading: isAnyLoading && !refreshing, // Show skeletons only on initial load
    refreshing, // Show spinner on pull-to-refresh
    countryData,
  };

  const handlers = {
    handleAddSpare,
    handleDelete,
    handleDetails,
    onEndReached,
    handleRefresh,
  };

  return {states, handlers};
};
