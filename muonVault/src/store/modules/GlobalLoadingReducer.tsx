import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';

export type GlobalLoading = {
  state: boolean;
};

export const GLOBAL_LOADING = 'GLOBAL/LOADING';

const {createStandardAction} = deprecated;

export const setGlobalLoadingState = createStandardAction(GLOBAL_LOADING)<Boolean>();
const actions = {
  setGlobalLoadingState
};
export type GlobalLoadingAction = ActionType<typeof actions>;

const initialState: GlobalLoading = {
  state: false
};

export const GlobalLoadingState = createReducer<GlobalLoading, GlobalLoadingAction>(initialState, {
  [GLOBAL_LOADING]: (state, action) =>
    produce(state, (draft) => Object.assign({}, draft, {state: action.payload})),
});
