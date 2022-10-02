import {Dispatch} from 'redux';
import {getBalanceBnb, requestBnbWithdrawConfirm} from '~/bc/VaultBinanceApi';
import {getBalanceEther, requestEtherWithdrawConfirm} from '~/bc/VaultEtherApi';
import {ETH_SYMBOL} from '~/view/constantProperties';
import {SafeAddressSet, WalletSet} from '../../api/interface/userApiResponse';
import { setGlobalLoadingState } from '../modules/GlobalLoadingReducer';
import {setScAssets} from '../modules/ScAssetReducer';
import {setDefaultVault, setTotalAssets} from '../modules/valutsReducer';

export const updateScAssets = (
  SafeAddressSet: SafeAddressSet,
  walletSet: WalletSet,
  totalMuon: string,
) => {
  return async (dispatch: Dispatch) => {
    const bitcoin = 0;
    let binance = 0;
    let etherBalance = 0;
    const usdc = 0;

    const muon = Number(totalMuon ? totalMuon : 0);
    console.log('::::::::::::::::::::: muon Balance ', muon);
    try {
      const res = await getBalanceBnb(
        walletSet.BNB.PRIVATE,
        SafeAddressSet.BNB,
      );
      console.log('::::::::::::::::::::: bnb Balance ', res);
      binance = Number(res);
    } catch (error) {}

    try {
      const res = await getBalanceEther(
        walletSet.ETH.PRIVATE,
        SafeAddressSet.ETH,
      );
      console.log('::::::::::::::::::::: ether Balance ', res);
      etherBalance = Number(res);
    } catch (error) {}

    dispatch(
      setTotalAssets({
        vaults: [],
        totalAssets: {
          binance: binance,
          bitcoin: bitcoin,
          ethereum: etherBalance,
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
          //contractAddress: SafeAddressSet.ETH,
          contractAddress: '0x208064804D5062e20551942b2bC626333fE8f3B9'
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
    dispatch(setGlobalLoadingState(false));
  };
};

// export const requestWithdrawConfirmFromVaultAsset = (
//   toAddress: string,
//   value: string,
//   privateKey: string,
//   contractAddress: string,
//   symbol: string,
// ) => {
//   return async (dispatch: Dispatch) => {
//     let res;
//     if (symbol === ETH_SYMBOL) {
//       res = await requestEtherWithdrawConfirm(
//         toAddress,
//         value,
//         privateKey,
//         contractAddress,
//       );
//     } else if (symbol === ETH_SYMBOL) {
//       res = await requestBnbWithdrawConfirm(
//         toAddress,
//         value,
//         privateKey,
//         contractAddress,
//       );
//     }

//     console.log(JSON.stringify(res));
//   };
// };
