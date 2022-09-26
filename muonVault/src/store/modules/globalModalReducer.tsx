import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';
import {VaultList} from '../../model/vaults';
import {WalletSet} from '../../model/wallet';
import {View} from 'react-native';

export interface GloblaModalStore {
  content: React.ReactNode;
  height: number;
  open: boolean;
}

const {createStandardAction} = deprecated;

export const UPDATE_GLOBAL_MODAL_STATE = 'MODAL/UPDATE_GLOBAL_MODAL_STATE';

export const setGlobalModalState = createStandardAction(
  UPDATE_GLOBAL_MODAL_STATE,
)<GloblaModalStore>();

const actions = {
  setGlobalModalState,
};

export type VaultsAction = ActionType<typeof actions>;
export type VaultsStore = GloblaModalStore;

const initialState: GloblaModalStore = {
  content: '',
  height: 100,
  open: false,
};

export const GlobalModalStoreData = createReducer<
  GloblaModalStore,
  VaultsAction
>(initialState, {
  [UPDATE_GLOBAL_MODAL_STATE]: (state, action) =>
    produce(state, draft => {
      const state: GloblaModalStore = action.payload;
      draft.open = state.open;
      draft.height = state.height;
      draft.content = state.content;
    }),
});
