import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import { UserApiResponse } from '~/api/interface/userApiResponse';
import User from '~/api/User';
import { updateScAssets } from '~/store/action/scAction';
import { updateVaultsFromApi } from '~/store/action/VaultAction';
import { updateWallet } from '~/store/action/walletAction';
import {RootState} from '~/store/modules';
import {BASE_BACKGROUND, MAIN_BLACK} from '../ColorCode';
import Toast from 'react-native-simple-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

const top_logo = require('../../../assets/image/top_logo.png');

type PropTopComponent = {};
const TopComponent: React.FC<
  React.PropsWithChildren<PropTopComponent>
> = ({}) => {

  const dispatch: any = useDispatch();
  const vaultStore = useSelector((root: RootState) => root.vaultsStore);


  function updateUserInfo() {
    User.info()
      .then(e => {
        const res: UserApiResponse = e;

        dispatch(updateWallet(res.Wallet));
        dispatch(updateVaultsFromApi());
        dispatch(updateScAssets(res.SafeAddress, res.Wallet, res.MUP));
        Toast.show(`refresh my assets`, Toast.SHORT);
      })
  }


  return (
    <View style={s.topComponentWrapper}>
      <TouchableOpacity onPress={()=>{
        updateUserInfo();
      }}>
      <FastImage
        resizeMode="contain"
        style={{
          width: 101,
          height: 20,
        }}
        source={top_logo}
      />
      </TouchableOpacity>
      <Text style={{fontSize: 16, fontWeight: '700', color: MAIN_BLACK}}>
        {vaultStore.totalAssets.muon.toFixed(2)} MU:P
      </Text>
    </View>
  );
};

export default TopComponent;

const s = StyleSheet.create({
  topComponentWrapper: {
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
