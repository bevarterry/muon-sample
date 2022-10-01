import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';
import {TotalAssets, Vault, VaultList} from '../../model/vaults';
import {DEFAULT_WALLET, NEW_CREATE} from '~/view/constantProperties';

const {createStandardAction} = deprecated;

export const UPDATE_VALUT_SET = 'ACCOUNT/UPDATE_VALUT_SET';
export const UPDATE_TOTAL_ASSETS = 'ACCOUNT/UPDATE_TOTAL_ASSETS';
export const UPDATE_VALUT_DEFAULT = 'ACCOUNT/UPDATE_VALUT_DEFAULT';
export const ADD_VALUT = 'ACCOUNT/ADD_VALUT';

export const setVaultsStore =
  createStandardAction(UPDATE_VALUT_SET)<VaultList>();

export const setDefaultVault =
  createStandardAction(UPDATE_VALUT_DEFAULT)<VaultList>();

export const setTotalAssets =
  createStandardAction(UPDATE_TOTAL_ASSETS)<VaultList>();

export const addVault = createStandardAction(ADD_VALUT)<VaultList>();

const actions = {
  setVaultsStore,
  setDefaultVault,
  addVault,
  setTotalAssets,
};

export type VaultsAction = ActionType<typeof actions>;
export type VaultsStore = VaultList;

const initialState: VaultList = {
  vaults: [],
  totalAssets: {
    binance: 0,
    bitcoin: 0,
    ethereum: 0,
    usdc: 0,
    muon: 0,
  },
};

function generateDefaultVault(vaults: Array<Vault>, totalAssets: TotalAssets) {
  let sumBnb = 0;
  let sumBtc = 0;
  let sumUsdc = 0;
  let sumEth = 0;
  let sumVp = 0;

  vaults.forEach(v => {
    sumBnb += Number(v.BNB);
    sumBtc += Number(v.BTC);
    sumUsdc += Number(v.USDC);
    sumEth += Number(v.ETH);
    sumVp += Number(v.VP);
  });

  const defaultVault = [
    {
      idx: DEFAULT_WALLET,
      id: DEFAULT_WALLET,
      name: 'Wallet (main)',
      BTC: totalAssets.bitcoin - sumBtc,
      BNB: totalAssets.binance - sumBnb,
      USDC: totalAssets.usdc - sumUsdc,
      ETH: totalAssets.ethereum - sumEth,
      VP: totalAssets.muon - sumVp,
      color: '#242424',
    },
  ];

  return defaultVault.concat(vaults).concat({
    idx: NEW_CREATE,
    id: NEW_CREATE,
    name: 'Create New Safe',
    BTC: 0,
    BNB: 0,
    USDC: 0,
    ETH: 0,
    VP: 0,
    color: '',
  });
}
export const VaultsStoreData = createReducer<VaultList, VaultsAction>(
  initialState,
  {
    [UPDATE_VALUT_SET]: (state, action) =>
      produce(state, draft => {
        const vaults: VaultList = action.payload;
        draft.vaults = generateDefaultVault(vaults.vaults, draft.totalAssets);
        console.log(
          '::::::::::::::::::::: [Vault Set] : ',
          JSON.stringify(draft),
        );
      }),
    [UPDATE_TOTAL_ASSETS]: (state, action) =>
      produce(state, draft => {
        const vaults: VaultList = action.payload;
        if (!vaults.totalAssets) return;

        const defaultWalletIndex = draft.vaults.findIndex(
          v => v.idx === DEFAULT_WALLET,
        );
        if (defaultWalletIndex !== -1)
          draft.vaults.splice(defaultWalletIndex, 1);

        const createNewIndex = draft.vaults.findIndex(
          v => v.idx === NEW_CREATE,
        );
        if (createNewIndex !== -1) draft.vaults.splice(createNewIndex, 1);

        generateDefaultVault(vaults.vaults, vaults.totalAssets);

        draft.vaults = generateDefaultVault(draft.vaults, vaults.totalAssets);
        draft.totalAssets = {
          binance: vaults.totalAssets.binance,
          bitcoin: vaults.totalAssets.bitcoin,
          ethereum: vaults.totalAssets.ethereum,
          usdc: vaults.totalAssets.usdc,
          muon: vaults.totalAssets.muon,
        };
      }),
    [ADD_VALUT]: (state, action) =>
      produce(state, draft => {
        const vaults: VaultList = action.payload;

        draft.vaults = vaults.vaults;
      }),
    [UPDATE_VALUT_DEFAULT]: (state, action) =>
      produce(state, draft => {
        // const vaults: VaultList = action.payload;
        // const vault = vaults.vaults[0];
        // let sumBnb = 0;
        // let sumBtc = 0;
        // let sumUsdc = 0;
        // let sumEth = 0;
        // let sumVp = 0;
        // const defaultIndex = draft.vaults.findIndex(
        //   v => v.idx === 'DEFAULT_WALLET',
        // );
        // if (defaultIndex !== -1) draft.vaults.splice(defaultIndex, 1);
        // draft.vaults.forEach(v => {
        //   sumBnb += Number(v.BNB);
        //   sumBtc += Number(v.BTC);
        //   sumUsdc += Number(v.USDC);
        //   sumEth += Number(v.ETH);
        //   sumVp += Number(v.VP);
        // });
        // vault.ETH = vault.ETH - sumEth;
        // vault.BTC = vault.BTC - sumBtc;
        // vault.BNB = vault.BNB - sumBnb;
        // vault.USDC = vault.USDC - sumUsdc;
        // vault.VP = vault.VP - sumVp;
        // draft.vaults = vaults.vaults.concat(draft.vaults);
      }),
  },
);
