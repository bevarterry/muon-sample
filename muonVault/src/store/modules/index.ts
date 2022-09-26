import {combineReducers} from 'redux';
import {CoinRatioStoreData} from './coinRatioReducer';
import {GlobalModalStoreData} from './globalModalReducer';
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
  globalModalStore: GlobalModalStoreData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
