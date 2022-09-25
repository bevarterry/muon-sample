import {combineReducers} from 'redux';
import {CoinRatioStoreData} from './coinRatioReducer';
import {DepositModalStoreData} from './modalReducer';
import {ScAssetsStoreData} from './ScAssetReducer';
import {UserStoreData} from './UserReducer';
import {VaultsStoreData} from './valutsReducer';
import {WalletStoreData} from './walletReducer';

const rootReducer = combineReducers({
  userStore: UserStoreData,
  scAssetsStore: ScAssetsStoreData,
  vaultsStore: VaultsStoreData,
  ratioStore: CoinRatioStoreData,
  depositModalStore: DepositModalStoreData,
  walletStore: WalletStoreData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
