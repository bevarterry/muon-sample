import {Dispatch} from 'redux';
import {WalletSet} from '../../api/interface/userApiResponse';
import {setWallets} from '../modules/walletReducer';

export const updateWallet = (wallets: WalletSet) => {
  console.log(wallets);
  return async (dispatch: Dispatch) => {
    return dispatch(
      setWallets({
        ETH: {
          privateKey: wallets.ETH.PRIVATE,
          address: wallets.ETH.PUBLIC,
        },
        BNB: {
          privateKey: wallets.BNB.PRIVATE,
          address: wallets.BNB.PUBLIC,
        },
        USDC: {
          privateKey: wallets.USDC.PRIVATE,
          address: wallets.USDC.PUBLIC,
        },
        BTC: {
          privateKey: wallets.BTC.PRIVATE,
          address: wallets.BTC.PUBLIC,
        },
      }),
    );
  };
};
