import {Dispatch} from 'redux';
import { getCoinRatio } from '~/api/CoinRatio';
import { Ratio } from '~/model/ratio';
import { setCoinRatio } from '../modules/coinRatioReducer';

export const updateCoinRatioAction = () => {
  return async (dispatch: Dispatch) => {
    const etherRatio = await getCoinRatio('eth-ethereum');
    const bnbRatio = await getCoinRatio('bnb-binance-coin');

    const initialState: Ratio = {
      ratioSet: {
        ETH: Number(etherRatio),
        BNB: Number(bnbRatio),
        BTC: 19006.7,
        USDC: 1,
        MU: 1.0,
      }
    };
    
    dispatch(
      setCoinRatio(initialState),
    );
  };
};
