import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';
import {VaultList} from '../../model/vaults';

const {createStandardAction} = deprecated;

export const UPDATE_VALUT_SET = 'ACCOUNT/UPDATE_VALUT_SET';

export const setScAssets = createStandardAction(UPDATE_VALUT_SET)<VaultList>();

const actions = {
  setScAssets,
};

export type VaultsAction = ActionType<typeof actions>;
export type VaultsStore = VaultList;

const initialState: VaultList = {
  vaults: [
    {
      id: '1',
      name: 'SAFE1',
      BTC: '200',
      BNB: '200',
      USDC: '200',
      ETH: '200',
      MU: '0',
    },
    {
      id: '2',
      name: 'SAFE2',
      BTC: '100',
      BNB: '200',
      USDC: '300',
      ETH: '400',
      MU: '0',
    },
    {
      id: '3',
      name: 'SAFE3',
      BTC: '100',
      BNB: '200',
      USDC: '300',
      ETH: '400',
      MU: '0',
    },
  ],
};

export const VaultsStoreData = createReducer<VaultList, VaultsAction>(
  initialState,
  {
    [UPDATE_VALUT_SET]: (state, action) =>
      produce(state, draft => {
        const vaults: VaultList = action.payload;
        draft.vaults = vaults.vaults;
      }),
  },
);
