import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './features/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


//1. now after installing raect-redux lets provide our store to the whole app like we did with context api
//.2 now every component inside app can access the store using useSelector and useDispatch actions from react-redux
//3. its actually broadcasting the state everycomponent that wants to read it//
//4.lets now read the state in customer.js first