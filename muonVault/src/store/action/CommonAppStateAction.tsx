import { Dispatch } from 'redux';
import { setHomeSelectedTab } from '../modules/CommonAppReducer';

export const changeHomeTab = (id: string) => {
  return async (dispatch: Dispatch) => {
    
    return dispatch(setHomeSelectedTab({
      id: id
    }));  
  };
};