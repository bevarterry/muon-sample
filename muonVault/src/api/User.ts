import Send from './AxiosConfig';
import {getCommonInfo} from '../store/global/state';
import {STORED_ACCESS_TOKEN} from '../view/constantProperties';
import {Response, UserApiResponse} from './interface/userApiResponse';
import {APIResponse} from '~/model/baseResponse';
import qs from 'qs';

export default {
  info(): Promise<UserApiResponse> {
    return new Promise((resolve, reject) => {
      Send({
        url: '/bc/user',
        method: 'get',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
        },
      })
        .then(response => {
          resolve(response.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateFcm(param: {fcmToken: string}): Promise<APIResponse> {
    return Send({
      url: '/fcm',
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: getCommonInfo(STORED_ACCESS_TOKEN),
      },
      data: qs.stringify(param),
    })
      .then(response => {
        console.log('[FCM Update res]', JSON.stringify(response.data));
        return response.data;
      })
      .catch(err =>
        console.log('[FCM Update error] !!!! ', JSON.stringify(err)),
      );
  },
};
