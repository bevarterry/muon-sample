import {Dispatch} from 'redux';
import {SafeAddressSet, WalletSet} from '../../api/interface/userApiResponse';
import {setScAssets} from '../modules/ScAssetReducer';
import {setDefaultVault, setTotalAssets} from '../modules/valutsReducer';

export const updateScAssets = (wallets: SafeAddressSet) => {
  return async (dispatch: Dispatch) => {
    const bitcoin = 0;
    const binance = 0;
    const ethereum = 100;
    const usdc = 0;
    const muon = 2000;

    dispatch(
      setTotalAssets({
        vaults: [],
        totalAssets: {
          binance: binance,
          bitcoin: bitcoin,
          ethereum: ethereum,
          usdc: usdc,
          muon: muon,
        },
      }),
    );
    dispatch(
      setScAssets({
        bitcoin: {
          symbol: 'BTC',
          displayName: 'Bitcoin',
          contractAddress: wallets.BTC,
        },
        ethereum: {
          symbol: 'ETH',
          displayName: 'Ethereum',
          contractAddress: wallets.ETH,
        },
        binance: {
          symbol: 'BNB',
          displayName: 'Binance',
          contractAddress: wallets.BNB,
        },
        usdc: {
          symbol: 'USDC',
          displayName: 'USDC',
          contractAddress: wallets.USDC,
        },
        muon: {
          symbol: 'MU',
          displayName: 'Muon',
          contractAddress: '',
        },
      }),
    );
  };
};
