import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Auth from '../../api/Auth';
import {setCommonInfo} from '../../store/global/state';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import BasicTextInput from '../common/basicTextInput';
import ButtonComponent from '../common/ButtonComponent';
import Top from '../common/top';
import {STORED_ACCESS_TOKEN} from '../constantProperties';

const InputInheritCode = (props: any) => {
  const navigation = useNavigation();
  const [inheritCode, setInheritCode] = useState('');

  const isActiveDoneButton = () => {
    return inheritCode !== '';
  };

  function requestAuthInheritCode() {
    // const param = {
    //   type: 'email',
    //   value: inheritCode,
    // };
    // Auth.auth(param)
    //   .then(res => {
    //     const {token} = res.data;
    //     setCommonInfo(STORED_ACCESS_TOKEN, token);
    //     navigation.navigate('VerifyCode' as never, {email: email} as never);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     Alert.alert('네트워크 호출도중 오류발생');
    //   });
  }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"}>
        <View style={s.wrapper}>
          <Top
            title={'Inherit MU:Vault'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <Text style={s.title}>
            Please type in your{'\n'}Inheritance code from{'\n'}the insurance
            company.
          </Text>
          <Text style={s.inputTitle}>Inheritance code</Text>
          <View style={{marginHorizontal: 23, marginTop: 10}}>
            <BasicTextInput
              update={(e: string) => {
                setInheritCode(e);
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
              initValue={inheritCode}
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
              title="Send"
              width="100%"
              borderColor={BASE_BUTTON}
              titleColor={DIMED_GRAY}
              borderRadius={20}
              activeColor={isActiveDoneButton() ? MAIN_BLACK : BASE_BUTTON}
              activeFontColor={isActiveDoneButton() ? CC_WHITE : DIMED_GRAY}
              bodyColor={BASE_BUTTON}
              click={requestAuthInheritCode}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default InputInheritCode;

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
