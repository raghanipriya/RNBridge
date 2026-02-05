import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/toolkit/store';
import {
  addUpdateSpare,
  deleteSpare,
  getSpare,
  getSpareByID,
} from '../../store/toolkit/spareSlice';

const SERVICE_CALL_ID = 'PE-SCR-250907-0001';
const DEFAULT_ROW_ID = '25f9kcpb1d';

export const useReduxEmp = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const spareItems = useAppSelector(state => state.spare.spareItems);
  const loadingMap = useAppSelector(state => state.spare.loadingMap);

  // Optimization: Similar to what we did in Zustand, we can derive loading here
  // However, traditionally in Redux, selectors are where memoization happens.
  // For this raw comparison, we'll just do the calculation in render like the original non-optimized code
  // OR we can demonstrate the "bad" behavior first.
  // The user asked to "check difference".
  // If I write optimized code immediately, they won't see the difference they experienced with Zustand initially.
  // But wait, the user's "bad" Zustand code had `Object.values(loadingMap)` inside the component/hook body which CAUSED re-renders.
  // In Redux, `useSelector` runs on every dispatch.
  // If I do `const loadingMap = useSelector(state => state.spare.loadingMap)`, this component WILL re-render every time ANY part of loadingMap changes.

  const isLoading = Object.values(loadingMap).some(Boolean);

  console.log('\n 🚀 ~ useReduxEmp ~ spareItems:', spareItems);
  console.log('\n 🚀 ~ useReduxEmp ~ isLoading:', isLoading);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('service_call_id', SERVICE_CALL_ID);
    params.append('row_id', DEFAULT_ROW_ID);
    dispatch(getSpare(params.toString()));
  }, [dispatch]);

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

    dispatch(addUpdateSpare(payload));
  }

  function handleDelete(id: string) {
    dispatch(deleteSpare({SERVICE_CALL_ID, id}));
  }

  function handleDetails(id: string) {
    dispatch(getSpareByID({SERVICE_CALL_ID, id}));
  }

  const states = {
    spareItems,
    loading: isLoading,
  };

  const handlers = {
    handleAddSpare,
    handleDelete,
    handleDetails,
  };

  return {states, handlers};
};
