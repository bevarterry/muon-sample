import Send from './AxiosConfig';
import {getCommonInfo} from '../store/global/state';
import {STORED_ACCESS_TOKEN} from '../view/constantProperties';
import {Response, UserApiResponse} from './interface/userApiResponse';

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
};
