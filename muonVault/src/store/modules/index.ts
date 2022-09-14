import {combineReducers} from 'redux';
import {ScAssetsStoreData} from './ScAssetReducer';
import {UserStoreData} from './UserReducer';

const rootReducer = combineReducers({
  userStore: UserStoreData,
  scAssetsStore: ScAssetsStoreData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
