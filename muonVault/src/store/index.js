import { applyMiddleware, combineReducers, createStore } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import reducer from './modules';

export default createStore(
  reducer,
  applyMiddleware(
    ReduxThunk,
    ...getDefaultMiddleware({
      serializableCheck: false
    })
  )
);
