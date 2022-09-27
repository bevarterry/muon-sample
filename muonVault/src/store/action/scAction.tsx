import {Dispatch} from 'redux';
import {getBalanceBnb} from '~/bc/VaultBinanceApi';
import {SafeAddressSet, WalletSet} from '../../api/interface/userApiResponse';
import {setScAssets} from '../modules/ScAssetReducer';
import {setDefaultVault, setTotalAssets} from '../modules/valutsReducer';

export const updateScAssets = (
  SafeAddressSet: SafeAddressSet,
  walletSet: WalletSet,
  totalMuon: string,
) => {
  return async (dispatch: Dispatch) => {
    const bitcoin = 0;
    const binance = await getBalanceBnb(walletSet.BNB.PRIVATE);
    const ethereum = 100;
    const usdc = 0;
    const muon = Number(totalMuon);

    dispatch(
      setTotalAssets({
        vaults: [],
        totalAssets: {
          binance: Number(binance),
          bitcoin: bitcoin,
          ethereum: ethereum,
          usdc: usdc,
          muon: muon,
        },
      }),
    );
    dispatch(
      setScAssets({
        bitcoin: {
          symbol: 'BTC',
          displayName: 'Bitcoin',
          contractAddress: SafeAddressSet.BTC,
        },
        ethereum: {
          symbol: 'ETH',
          displayName: 'Ethereum',
          contractAddress: SafeAddressSet.ETH,
        },
        binance: {
          symbol: 'BNB',
          displayName: 'Binance',
          contractAddress: SafeAddressSet.BNB,
        },
        usdc: {
          symbol: 'USDC',
          displayName: 'USDC',
          contractAddress: SafeAddressSet.USDC,
        },
        muon: {
          symbol: 'MU',
          displayName: 'Muon',
          contractAddress: '',
        },
      }),
    );
  };
};
