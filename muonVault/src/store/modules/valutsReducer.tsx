import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {ScAssets} from '../../model/scAssets';
import {Vault, VaultList} from '../../model/vaults';

const {createStandardAction} = deprecated;

export const UPDATE_VALUT_SET = 'ACCOUNT/UPDATE_VALUT_SET';
export const UPDATE_VALUT_DEFAULT = 'ACCOUNT/UPDATE_VALUT_DEFAULT';

export const setVaultsStore =
  createStandardAction(UPDATE_VALUT_SET)<VaultList>();

export const setDefaultVault =
  createStandardAction(UPDATE_VALUT_DEFAULT)<VaultList>();

const actions = {
  setVaultsStore,
  setDefaultVault,
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

    [UPDATE_VALUT_DEFAULT]: (state, action) =>
      produce(state, draft => {
        const vaults: VaultList = action.payload;
        const vault = vaults.vaults[0];

        let sumBnb = 0;
        let sumBtc = 0;
        let sumUsdc = 0;
        let sumEth = 0;
        let sumVp = 0;

        const defaultIndex = draft.vaults.findIndex(
          v => v.idx === 'DEFAULT_WALLET',
        );

        if (defaultIndex !== -1) draft.vaults.splice(defaultIndex, 1);

        draft.vaults.forEach(v => {
          console.log('[v ]', JSON.stringify(v));

          sumBnb += Number(v.BNB);
          sumBtc += Number(v.BTC);
          sumUsdc += Number(v.USDC);
          sumEth += Number(v.ETH);
          sumVp += Number(v.VP);
        });

        vault.ETH = vault.ETH - sumEth;
        vault.BTC = vault.BTC - sumBtc;
        vault.BNB = vault.BNB - sumBnb;
        vault.USDC = vault.USDC - sumUsdc;
        vault.VP = vault.VP - sumVp;
        console.log('[add default ]', JSON.stringify(vault), sumEth, sumVp);
        draft.vaults = vaults.vaults.concat(draft.vaults);
      }),
  },
);
