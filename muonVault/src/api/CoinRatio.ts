import Send from './AxiosConfig';
import {VaultResponse} from './interface/vaultApiResponse';

export function getCoinRatio(coinId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Send({
        url: `https://api.coinpaprika.com/v1/tickers/${coinId}`,
        method: 'get',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
        .then(response => {
          resolve(response.data.quotes.USD.price);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
