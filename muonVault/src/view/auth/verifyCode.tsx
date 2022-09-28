import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch} from 'react-redux';
import {UserApiResponse} from '~/api/interface/userApiResponse';
import User from '~/api/User';
import {updateScAssets} from '~/store/action/scAction';
import {updateVaultsFromApi} from '~/store/action/VaultAction';
import {updateWallet} from '~/store/action/walletAction';
import Auth from '../../api/Auth';
import {setAccessToken} from '../../storage/AccessTokenStorage';
import {getCommonInfo, setCommonInfo} from '../../store/global/state';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import BasicTextInput from '../common/basicTextInput';
import ButtonComponent from '../common/ButtonComponent';
import PinCodeInput from '../common/pinCodeInput';
import Top from '../common/top';
import {STORED_ACCESS_TOKEN, STORED_FCM_TOKEN} from '../constantProperties';

const VerifyCode = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pinCode, setVerifyCode] = useState('');

  useEffect(() => {
    if (props.route.params.email) {
      setEmail(props.route.params.email);
    }
  }, []);

  const isActiveDoneButton = () => {
    return pinCode.length == 6;
  };

  function requestVerifyPincode() {
    const param = {
      pin: pinCode,
    };
    Auth.verifyPinCode(param)
      .then(async res => {
        const {token} = res.data;

        await setAccessToken({accessToken: token});

        setCommonInfo(STORED_ACCESS_TOKEN, token);

        updateUserInfo();

        updateFcmToken();
      })
      .catch(e => {
        console.log(e);
      });
  }

  function updateFcmToken() {
    User.updateFcm({fcmToken: getCommonInfo(STORED_FCM_TOKEN)});
  }

  function updateUserInfo() {
    User.info()
      .then(e => {
        const res: UserApiResponse = e;

        //@ts-ignore
        dispatch(updateWallet(res.Wallet));

        //@ts-ignore
        dispatch(updateVaultsFromApi());

        //@ts-ignore
        dispatch(updateScAssets(res.SafeAddress, res.Wallet, res.VP));
        props.navigation.replace('Main');
      })
      .catch(e => {
        Alert.alert('인증은 정상적이나, 데이터로드에 오류발생');
      });
  }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"}>
        <View style={s.wrapper}>
          <Top
            title={'Verification Code'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <Text style={s.title}>Please enter code sent to {email}</Text>
          <Text style={s.inputTitle}>Verification code</Text>
          <View style={{marginHorizontal: 23, marginTop: 10}}>
            <PinCodeInput
              numberOnly={true}
              maxLength={6}
              update={(e: string) => {
                setVerifyCode(e);
              }}
              blur={(e: string) => {}}
              style={{
                paddingVertical: 16,
                width: '100%',
                borderTopWidth: 0,
                borderBottomWidth: 3,
                borderColor: MAIN_BLACK,
                borderRightWidth: 0,
                borderRadius: 0,
                borderLeftWidth: 0,
                marginTop: 10,
              }}
              initValue={email}
              textContentStyle={{
                fontSize: 22,
                fontWeight: '700',
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 22,
              position: 'absolute',
              bottom: 43,
            }}>
            <ButtonComponent
              title="Verify"
              width="100%"
              borderColor={BASE_BUTTON}
              titleColor={DIMED_GRAY}
              borderRadius={20}
              activeColor={isActiveDoneButton() ? MAIN_BLACK : BASE_BUTTON}
              activeFontColor={isActiveDoneButton() ? CC_WHITE : DIMED_GRAY}
              bodyColor={BASE_BUTTON}
              click={requestVerifyPincode}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default VerifyCode;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
  },
  title: {
    marginLeft: 23,
    marginTop: 40,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
  },
  inputTitle: {
    marginLeft: 23,
    marginTop: 50,
    fontSize: 14,
    fontWeight: '600',
    color: DIMED_GRAY,
  },
});
