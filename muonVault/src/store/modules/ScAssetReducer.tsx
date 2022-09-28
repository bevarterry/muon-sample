import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssetInfo, ScAssets} from '../../model/scAssets';

const {createStandardAction} = deprecated;

export const UPDATE_SC_ASSET_SET = 'ACCOUNT/UPDATE_SC_ASSET_SET';
export const UPDATE_SC_CONTRACT_ADDRESS = 'ACCOUNT/UPDATE_SC_CONTRACT_ADDRESS';

export const UPDATE_ETH_SC = 'ACCOUNT/UPDATE_ETH_SC';
export const UPDATE_BTC_SC = 'ACCOUNT/UPDATE_BTC_SC';
export const UPDATE_BNB_SC = 'ACCOUNT/UPDATE_BNB_SC';
export const UPDATE_USDC_SC = 'ACCOUNT/UPDATE_USDC_SC';

export const setScAssets =
  createStandardAction(UPDATE_SC_ASSET_SET)<ScAssets>();

export const setScAddress = createStandardAction(
  UPDATE_SC_CONTRACT_ADDRESS,
)<ScAssets>();

export const setEthSc = createStandardAction(UPDATE_ETH_SC)<ScAssetInfo>();
export const setBtcSc = createStandardAction(UPDATE_BTC_SC)<ScAssetInfo>();
export const setBnbSc = createStandardAction(UPDATE_BNB_SC)<ScAssetInfo>();
export const setUsdcSc = createStandardAction(UPDATE_USDC_SC)<ScAssetInfo>();

const actions = {
  setScAssets,
  setScAddress,
  setBtcSc,
  setEthSc,
  setBnbSc,
  setUsdcSc,
};

export type ScAssetsAction = ActionType<typeof actions>;
export type ScAssetsStore = ScAssets;

const initialState: ScAssets = {
  bitcoin: {
    symbol: 'BTC',
    displayName: 'Bitcoin',
    contractAddress: '',
    ratio: 0,
  },
  ethereum: {
    symbol: 'ETH',
    displayName: 'Ethereum',
    contractAddress: '',
    ratio: 0,
  },
  binance: {
    symbol: 'BNB',
    displayName: 'Binance',
    contractAddress: '',
    ratio: 0,
  },
  usdc: {
    symbol: 'USDC',
    displayName: 'USDC',
    contractAddress: '',
    ratio: 0,
  },
  muon: {
    symbol: 'MU:P',
    displayName: 'MU:P',
    contractAddress: '',
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
    [UPDATE_ETH_SC]: (state, action) =>
      produce(state, draft => {
        const res = Object.assign({}, draft, {ethereum: action.payload});
        return res;
      }),
    [UPDATE_BNB_SC]: (state, action) =>
      produce(state, draft => {
        return Object.assign({}, draft, {binance: action.payload});
      }),
    [UPDATE_USDC_SC]: (state, action) =>
      produce(state, draft => {
        const res = Object.assign({}, draft, {usdc: action.payload});
        return res;
      }),
    [UPDATE_BTC_SC]: (state, action) =>
      produce(state, draft => {
        return Object.assign({}, draft, {bitcoin: action.payload});
      }),
  },
);
