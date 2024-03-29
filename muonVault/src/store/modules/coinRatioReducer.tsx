import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {Ratio} from '../../model/ratio';

const {createStandardAction} = deprecated;

export const UPDATE_RATIO_SET = 'COIN/UPDATE_RATIO_SET';

export const setCoinRatio = createStandardAction(UPDATE_RATIO_SET)<Ratio>();

const actions = {
  setCoinRatio,
};

export type RatioAction = ActionType<typeof actions>;
export type RatioStore = Ratio;

const initialState: Ratio = {
  ratioSet: {
    BTC: 19006.7,
    BNB: 275.48,
    USDC: 1,
    ETH: 1328.1,
    MU: 1.0,
  },
};

export const CoinRatioStoreData = createReducer<Ratio, RatioAction>(
  initialState,
  {
    [UPDATE_RATIO_SET]: (state, action) =>
      produce(state, draft => {
        const ratio: Ratio = action.payload;
        draft.ratioSet = ratio.ratioSet;
      }),
  },
);
