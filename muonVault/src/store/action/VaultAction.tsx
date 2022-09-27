import {Dispatch} from 'redux';
import {VaultResponse} from '../../api/interface/vaultApiResponse';
import VaultApi from '../../api/Vault';
import {TotalAssets, Vault, VaultList} from '../../model/vaults';
import {setDefaultVault, setVaultsStore} from '../modules/valutsReducer';
export const updateVaultsFromApi = () => {
  return async (dispatch: Dispatch) => {
    VaultApi.vaults()
      .then(res => {
        dispatch(setVaultsStore(mapToStore(res)));
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const updateVaults = (vaults: Array<VaultResponse>) => {
  return async (dispatch: Dispatch) => {
    dispatch(setVaultsStore(mapToStore(vaults)));
  };
};

export const addDefaultVault = (totalAssets: TotalAssets) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      setDefaultVault({
        totalAssets: totalAssets,
        vaults: [],
      }),
    );
  };
};

export const patchVault = (param: {
  symbol: string;
  fromVaultIdx: string;
  toVaultIdx: string;
  value: number;
}) => {
  return async (dispatch: Dispatch) => {
    VaultApi.patchVault(param)
      .then(res => {
        dispatch(setVaultsStore(mapToStore(res)));
      })
      .catch(e => {});
  };
};

export function createNewVault(name: string) {
  return async (dispatch: Dispatch) => {
    const responseVaultLisst = await VaultApi.createNewVault(name);

    dispatch(setVaultsStore(mapToStore(responseVaultLisst)));
    return true;
  };
}

const colorSet = ['#A12626', '#2E6FD1', '#2E6FD1', '#2E6FD1'];
function mapToStore(list: Array<VaultResponse>): VaultList {
  const result: VaultList = {
    vaults: [],
    totalAssets: {bitcoin: 0, binance: 0, ethereum: 0, usdc: 0, muon: 0},
  };
  const mappingVault: Array<Vault> = [];

  for (const i in list) {
    mappingVault.push({
      idx: list[i].idx,
      id: list[i].id,
      name: list[i].name,
      BTC: list[i].BTC,
      BNB: list[i].BNB,
      USDC: list[i].USDC,
      ETH: list[i].ETH,
      VP: list[i].VP,
      color: colorSet[i],
    });
  }

  result.vaults = mappingVault;

  return result;
}
