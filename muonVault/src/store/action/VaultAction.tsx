import {Dispatch} from 'redux';
import {VaultResponse} from '../../api/interface/vaultApiResponse';
import VaultApi from '../../api/Vault';
import {Vault, VaultList} from '../../model/vaults';
import {setVaultsStore} from '../modules/valutsReducer';
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

const colorSet = ['#242424', '#A12626', '#2E6FD1', '#2E6FD1', '#2E6FD1'];
function mapToStore(list: Array<VaultResponse>): VaultList {
  console.log(JSON.stringify(list));

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

  console.log(JSON.stringify(mappingVault));

  result.vaults = mappingVault;

  return result;
}
