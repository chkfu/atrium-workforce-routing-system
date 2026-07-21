import { useEffect, useState, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API } from '../config/api';
import { AppDispatch } from '../redux/store';
import { setAuth } from '../redux/slices/AuthSlice';

//  learnt: provider as the global state management for the application
//  remarks: though auth states stored at redux, but requrie useEffect for tracing updates
export default function AuthProvider({ children }: { children: ReactNode }) { 

  //  remarks: core states are managed in redux's auth slice
  const dispatch = useDispatch<AppDispatch>();
  const [isChecking, setIsChecking] = useState(true);

  //  remarks: keep tracing currenly login user, store details in redux's auth slice
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(API.SECURED_SELF);
        dispatch(setAuth(res.data.data));
      } catch {
        //  remarks: yet to login will remained erroor at server-side handling
      } finally {
        setIsChecking(false);
      }
    })();
  }, [dispatch]);

  if (isChecking) return null;
  return <>{children}</>;
}
