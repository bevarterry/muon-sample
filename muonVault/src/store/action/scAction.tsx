import {Dispatch} from 'redux';
import {SafeAddressSet, WalletSet} from '../../api/interface/userApiResponse';
import {setScAssets} from '../modules/ScAssetReducer';

export const updateScAssets = (wallets: SafeAddressSet) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      setScAssets({
        bitcoin: {
          symbol: 'BTC',
          displayName: 'Bitcoin',
          contractAddress: wallets.BTC,
          totalValue: '0',
        },
        ethereum: {
          symbol: 'ETH',
          displayName: 'Ethereum',
          contractAddress: wallets.ETH,
          totalValue: '1.2',
        },
        binance: {
          symbol: 'BNB',
          displayName: 'Binance',
          contractAddress: wallets.BNB,
          totalValue: '0',
        },
        usdc: {
          symbol: 'USDC',
          displayName: 'USDC',
          contractAddress: wallets.USDC,
          totalValue: '0',
        },
        muon: {
          symbol: 'MU',
          displayName: 'Muon',
          contractAddress: '',
          totalValue: '0',
        },
      }),
    );
  };
};
