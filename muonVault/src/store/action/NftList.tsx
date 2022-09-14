import {Dispatch} from 'redux';

import NTF from '../../api/NFT';
import {setMyNftList} from '../modules/MyNftListReducer';
import {setGlobalLoadingState} from '../modules/GlobalLoadingReducer';

export const updateMyNFTList = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setGlobalLoadingState(true));

    return NTF.myNftlist(userId).then((response: any) => {
      if (response.status === 200) {
        dispatch(setMyNftList(response.data.data));
      }
      dispatch(setGlobalLoadingState(false));
    });
  };
};

export const mintNFT = (userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setGlobalLoadingState(true));
    return NTF.mintNft(userId).then((response: any) => {
      if (response.status === 200) {
        updateMyNFTList(userId);
      }
      dispatch(setGlobalLoadingState(false));
    });
  };
};
