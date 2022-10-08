import {Dispatch} from 'redux';
import {WalletSet} from '../../api/interface/userApiResponse';
import {setWallets} from '../modules/walletReducer';

export const updateWallet = (wallets: WalletSet) => {
  return async (dispatch: Dispatch) => {
    const keyset = {
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
    };
    console.log('[Key Set] ---- ', JSON.stringify(keyset))

    return dispatch(
      // setWallets({
      //   ETH: {
      //     privateKey: wallets.ETH.PRIVATE,
      //     address: wallets.ETH.PUBLIC,
      //   },
      //   BNB: {
      //     privateKey: wallets.BNB.PRIVATE,
      //     address: wallets.BNB.PUBLIC,
      //   },
      //   USDC: {
      //     privateKey: wallets.USDC.PRIVATE,
      //     address: wallets.USDC.PUBLIC,
      //   },
      //   BTC: {
      //     privateKey: wallets.BTC.PRIVATE,
      //     address: wallets.BTC.PUBLIC,
      //   },
      // }),

      setWallets(keyset),
    );
  };
};
