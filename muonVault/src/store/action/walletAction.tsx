import {Dispatch} from 'redux';
import {WalletSet} from '../../api/interface/userApiResponse';
import {setWallets} from '../modules/walletReducer';

export const updateWallet = (wallets: WalletSet) => {
  return async (dispatch: Dispatch) => {
    const keyset = {
      ETH: {
        privateKey: '18015c5f6d8ce91bed729d1c6285ba6225c9746d964ebcefa8662ffb3197a394',
        address: '0x5fb5A92c605e78B247dA491Accf7A5Df180826C7',
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
