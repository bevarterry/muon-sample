import Send from './AxiosConfig';
import qs from 'qs';
import {APIResponse} from '../model/baseResponse';
import {getCommonInfo} from '../store/global/state';
import {STORED_ACCESS_TOKEN} from '../view/constantProperties';

export default {
  auth(param: {type: string; value: string}): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      Send({
        url: '/auth',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(param),
      })
        .then(response => {
          console.log('auth success', JSON.stringify(response));
          resolve(response.data);
        })
        .catch(err => {
          console.log('auth fail', JSON.stringify(err));
          reject(err);
        });
    });
  },
  verifyPinCode(param: {pin: string}): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      Send({
        url: '/auth/pin',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
        },
        data: qs.stringify(param),
      })
        .then(response => {
          console.log('auth success', JSON.stringify(response));
          resolve(response.data);
        })
        .catch(err => {
          console.log('auth fail', JSON.stringify(err));
          reject(err);
        });
    });
  },
};
