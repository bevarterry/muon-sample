import {Dispatch} from 'redux';
import {VaultResponse} from '../../api/interface/vaultApiResponse';
import VaultApi from '../../api/Vault';
import {Vault, VaultList} from '../../model/vaults';
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

export const addDefaultVault = (totalVauueVault: Vault) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      setDefaultVault({
        vaults: [totalVauueVault],
      }),
    );
  };
};

const colorSet = ['#A12626', '#2E6FD1', '#2E6FD1', '#2E6FD1'];
function mapToStore(list: Array<VaultResponse>): VaultList {
  const result: VaultList = {vaults: []};
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
