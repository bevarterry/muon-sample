import {Dispatch} from 'redux';
import { getCoinRatio } from '~/api/CoinRatio';
import {getBalanceBnb, requestBnbWithdrawConfirm} from '~/bc/VaultBinanceApi';
import {getBalanceEther, requestEtherWithdrawConfirm} from '~/bc/VaultEtherApi';
import { Ratio } from '~/model/ratio';
import {ETH_SYMBOL} from '~/view/constantProperties';
import {SafeAddressSet, WalletSet} from '../../api/interface/userApiResponse';
import { setCoinRatio } from '../modules/coinRatioReducer';
import {setGlobalLoadingState} from '../modules/GlobalLoadingReducer';
import {setScAssets} from '../modules/ScAssetReducer';
import {setDefaultVault, setTotalAssets} from '../modules/valutsReducer';

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
