import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';
import {VaultList} from '../../model/vaults';
import {WalletSet} from '../../model/wallet';

const {createStandardAction} = deprecated;

export const UPDATE_WALLET_SET = 'WALLET/UPDATE_WALLET_SET';

export const setWallets = createStandardAction(UPDATE_WALLET_SET)<WalletSet>();

const actions = {
  setWallets,
};

export type VaultsAction = ActionType<typeof actions>;
export type VaultsStore = WalletSet;

const initialState: WalletSet = {
  ETH: {
    privateKey: '',
    address: '',
  },
  BNB: {
    privateKey: '',
    address: '',
  },
  USDC: {
    privateKey: '',
    address: '',
  },
  BTC: {
    privateKey: '',
    address: '',
  },
};

export const WalletStoreData = createReducer<WalletSet, VaultsAction>(
  initialState,
  {
    [UPDATE_WALLET_SET]: (state, action) =>
      produce(state, draft => {
        const wallets: WalletSet = action.payload;

        draft.ETH = wallets.ETH;
        draft.BNB = wallets.BNB;
        draft.USDC = wallets.USDC;
        draft.BTC = wallets.BTC;
      }),
  },
);
