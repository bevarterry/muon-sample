import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';
import {VaultList} from '../../model/vaults';

const {createStandardAction} = deprecated;

export const UPDATE_VALUT_SET = 'ACCOUNT/UPDATE_VALUT_SET';

export const setVaultsStore =
  createStandardAction(UPDATE_VALUT_SET)<VaultList>();

const actions = {
  setVaultsStore,
};

export type VaultsAction = ActionType<typeof actions>;
export type VaultsStore = VaultList;

const initialState: VaultList = {
  vaults: [],
};

export const VaultsStoreData = createReducer<VaultList, VaultsAction>(
  initialState,
  {
    [UPDATE_VALUT_SET]: (state, action) =>
      produce(state, draft => {
        const vaults: VaultList = action.payload;
        draft.vaults = vaults.vaults;
        draft.vaults.push({
          idx: 'NEW_CREATE',
          id: 'NEW_CREATE',
          name: 'CREATE A NEW SAFE',
          BTC: 0,
          BNB: 0,
          USDC: 0,
          ETH: 0,
          VP: 0,
          color: '',
        });
      }),
  },
);
