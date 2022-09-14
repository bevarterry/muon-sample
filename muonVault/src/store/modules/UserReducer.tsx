import {ActionType, createReducer, deprecated} from 'typesafe-actions';
import produce from 'immer';
import {UserProfile} from '../../model/user';

const {createStandardAction} = deprecated;

export const UPDATE_USER_SET = 'ACCOUNT/UPDATE_USER_SET';

export const setMember = createStandardAction(UPDATE_USER_SET)<UserProfile>();

const actions = {
  setMember,
};

export type UserAction = ActionType<typeof actions>;
export type UserStore = UserProfile;

const initialState: UserProfile = {
  address: '',
  encPrivateKey: '',
  hashedPin: '',
  phoneNumber: '',
  email: '',
  fcmToken: '',
  imageUrl:
    'https://lh3.googleusercontent.com/-vgHaHJKRzXxXWd6OuY0vCwesaHfOHYeBbuvs6gZe9NoCK3I-NqTWngMAKDEyO7suAY8RQQLNbV5TlqYZULFpaQ6WQ7rkVuqaXkH=s168',
};

export const UserStoreData = createReducer<UserProfile, UserAction>(
  initialState,
  {
    [UPDATE_USER_SET]: (state, action) =>
      produce(state, draft => {
        const userProfile: UserProfile = action.payload;
        draft.address = userProfile.address ? userProfile.address : '';
        draft.hashedPin = userProfile.hashedPin ? userProfile.hashedPin : '';
        draft.email = userProfile.email ? userProfile.email : '';
        draft.fcmToken = userProfile.fcmToken ? userProfile.fcmToken : '';
        draft.encPrivateKey = userProfile.encPrivateKey
          ? userProfile.encPrivateKey
          : '';
        draft.phoneNumber = userProfile.phoneNumber
          ? userProfile.phoneNumber
          : '';
      }),
  },
);
