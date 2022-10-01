import Send from './AxiosConfig';
import qs from 'qs';
import {VaultResponse} from './interface/vaultApiResponse';
import {getCommonInfo} from '../store/global/state';
import {STORED_ACCESS_TOKEN} from '../view/constantProperties';

export default {
  vaults(): Promise<Array<VaultResponse>> {
    return new Promise((resolve, reject) => {
      Send({
        url: '/vaults',
        method: 'get',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
        },
      })
        .then(response => {
          console.log(11111, JSON.stringify(response.data.data.vaults));
          resolve(response.data.data.vaults);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  history(vaultId: string, symbol: string): Promise<Array<VaultResponse>> {
    return new Promise((resolve, reject) => {
      Send({
        url: `/bc/vault/${vaultId}/history?symbol=${symbol}`,
        method: 'get',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
        },
      })
        .then(response => {
          //console.log(response.data.data.histories);
          resolve(response.data.data.histories);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createNewVault(vaultName: string): Promise<Array<VaultResponse>> {
    return new Promise((resolve, reject) => {
      const param = {
        name: vaultName,
      };
      Send({
        url: '/vault',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
        },
        data: qs.stringify(param),
      })
        .then(response => {
          resolve(response.data.data.vaults);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  patchVault(param: {
    symbol: string;
    fromVaultIdx: string;
    toVaultIdx: string;
    value: number;
  }): Promise<Array<VaultResponse>> {
    return new Promise((resolve, reject) => {
      Send({
        url: '/vault',
        method: 'patch',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
        },
        data: qs.stringify(param),
      })
        .then(response => {
          resolve(response.data.data.vaults);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
