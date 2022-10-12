import Send from './AxiosConfig';
import qs from 'qs';
import {VaultResponse} from './interface/vaultApiResponse';

export function postInheritPin(deadPin: string, token: string): Promise<Array<VaultResponse>> {
    return new Promise((resolve, reject) => {
      Send({
        url: `/bc/inherit`,
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
        data: qs.stringify({
          deadPin: deadPin
        }),
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
