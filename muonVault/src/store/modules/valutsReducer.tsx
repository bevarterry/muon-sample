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
      }),
  },
);
