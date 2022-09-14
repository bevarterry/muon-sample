import {combineReducers} from 'redux';
import {CoinRatioStoreData} from './coinRatioReducer';
import {ScAssetsStoreData} from './ScAssetReducer';
import {UserStoreData} from './UserReducer';
import {VaultsStoreData} from './valutsReducer';

const rootReducer = combineReducers({
  userStore: UserStoreData,
  scAssetsStore: ScAssetsStoreData,
  vaultsStore: VaultsStoreData,
  ratioStore: CoinRatioStoreData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
