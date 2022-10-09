import Send from './AxiosConfig';
import qs from 'qs';
import {VaultResponse} from './interface/vaultApiResponse';
import {getCommonInfo} from '../store/global/state';
import {STORED_ACCESS_TOKEN} from '../view/constantProperties';

export function postInheritPin(deadPin: string, token: string): Promise<Array<VaultResponse>> {
    return new Promise((resolve, reject) => {
      Send({
        url: `/bc/inherit`,
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      })
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
