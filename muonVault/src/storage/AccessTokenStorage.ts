import {getItem, setItem} from './index';

export interface Auth {
  accessToken: string;
}
const AccessTokenStorageKey = 'SERVER_ACCESS_TOKEN';

export const getAccessToken = (): Promise<Auth | undefined> =>
  getItem<Auth>(AccessTokenStorageKey);
export const setAccessToken = (value: Auth) =>
  setItem<Auth>(AccessTokenStorageKey, value);
