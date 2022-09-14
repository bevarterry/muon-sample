import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';

const {createStandardAction} = deprecated;

export const UPDATE_SC_ASSET_SET = 'ACCOUNT/UPDATE_SC_ASSET_SET';

export const setScAssets =
  createStandardAction(UPDATE_SC_ASSET_SET)<ScAssets>();

const actions = {
  setScAssets,
};

export type ScAssetsAction = ActionType<typeof actions>;
export type ScAssetsStore = ScAssets;

const initialState: ScAssets = {
  bitcoin: {
    symbol: 'BTC',
    displayName: 'Bitcoin',
    contractAddress: '',
    totalValue: '0',
    ratio: 0,
  },
  ethereum: {
    symbol: 'ETH',
    displayName: 'Ethereum',
    contractAddress: '',
    totalValue: '0',
    ratio: 0,
  },
  binance: {
    symbol: 'BNB',
    displayName: 'Binance',
    contractAddress: '',
    totalValue: '0',
    ratio: 0,
  },
  usdc: {
    symbol: 'USDC',
    displayName: 'USDC',
    contractAddress: '',
    totalValue: '0',
    ratio: 0,
  },
  muon: {
    symbol: 'MU',
    displayName: 'Muon',
    contractAddress: '',
    totalValue: '0',
    ratio: 0,
  },
};

export const ScAssetsStoreData = createReducer<ScAssets, ScAssetsAction>(
  initialState,
  {
    [UPDATE_SC_ASSET_SET]: (state, action) =>
      produce(state, draft => {
        const scAssets: ScAssets = action.payload;

        draft.bitcoin = scAssets.bitcoin;
        draft.ethereum = scAssets.ethereum;
        draft.binance = scAssets.binance;
        draft.usdc = scAssets.usdc;
        draft.muon = scAssets.muon;
      }),
  },
);
