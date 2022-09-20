import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {DepositModal} from '../../model/Modal';

const {createStandardAction} = deprecated;

export const UPDATE_DEPOSIT_OPEN = 'MODAL/UPDATE_DEPOSIT_OPEN';

export const setDepositModalState =
  createStandardAction(UPDATE_DEPOSIT_OPEN)<DepositModal>();

const actions = {
  setDepositModalState,
};

export type DepositModalAction = ActionType<typeof actions>;
export type DepositModalStore = DepositModal;

const initialState: DepositModal = {
  show: false,
};

export const DepositModalStoreData = createReducer<
  DepositModal,
  DepositModalAction
>(initialState, {
  [UPDATE_DEPOSIT_OPEN]: (state, action) =>
    produce(state, draft => {
      const state: DepositModal = action.payload;
      draft.show = state.show;
    }),
});
