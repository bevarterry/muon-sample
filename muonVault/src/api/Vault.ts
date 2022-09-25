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
          resolve(response.data.data.vaults);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
