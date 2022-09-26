import {Dispatch} from 'redux';
import {SafeAddressSet, WalletSet} from '../../api/interface/userApiResponse';
import {setScAssets} from '../modules/ScAssetReducer';
import {setDefaultVault} from '../modules/valutsReducer';

export const updateScAssets = (wallets: SafeAddressSet) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      setScAssets({
        bitcoin: {
          symbol: 'BTC',
          displayName: 'Bitcoin',
          contractAddress: wallets.BTC,
          totalValue: 0,
        },
        ethereum: {
          symbol: 'ETH',
          displayName: 'Ethereum',
          contractAddress: wallets.ETH,
          totalValue: 2.2,
        },
        binance: {
          symbol: 'BNB',
          displayName: 'Binance',
          contractAddress: wallets.BNB,
          totalValue: 3.2,
        },
        usdc: {
          symbol: 'USDC',
          displayName: 'USDC',
          contractAddress: wallets.USDC,
          totalValue: 0,
        },
        muon: {
          symbol: 'MU',
          displayName: 'Muon',
          contractAddress: '',
          totalValue: 2000,
        },
      }),
    );

    // dispatch(
    //   setDefaultVault({
    //     vaults: [
    //       {
    //         idx: 'DEFAULT_WALLET',
    //         id: 'DEFAULT_WALLET',
    //         name: 'WALLET',
    //         BTC: 0,
    //         BNB: 3.2,
    //         USDC: 0,
    //         ETH: 2.2,
    //         VP: 2000,
    //         color: '',
    //       },
    //     ],
    //   }),
    // );
  };
};
