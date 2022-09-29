import { Dispatch } from 'redux';

import { setGlobalLoadingState, } from '../modules/GlobalLoadingReducer';

export const changeLoadingState = (state: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch(setGlobalLoadingState(state));
  };
};