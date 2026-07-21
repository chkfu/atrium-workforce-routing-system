import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import axios from 'axios';
import './index.css';
import App from './App';
import { store } from './redux/store';
import AuthProvider from './providers/AuthProvider';

//  learnt: require the broswer store axios related details in cookie
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ReduxProvider>
  </StrictMode>
);
