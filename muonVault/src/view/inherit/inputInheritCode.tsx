import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Auth from '../../api/Auth';
import { setCommonInfo } from '../../store/global/state';
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
import { INHERIT_VERIFY_CODE, STORED_ACCESS_TOKEN } from '../constantProperties';

const InputInheritCode = (props: any) => {
  const navigation = useNavigation();
  const [inheritCode, setInheritCode] = useState('');

  const isActiveDoneButton = () => {
    return inheritCode !== '';
  };

  function moveToPhoneAuth() {
    navigation.navigate('InputPhone' as never, { inheritCode: inheritCode } as never);
  }

  function requestAuthInheritCode() {
    if (!isActiveDoneButton()) return;
    moveToPhoneAuth();
  }

  return (
    <>
      <ScrollView contentContainerStyle={s.wrapper} style={{ height: '100%' }}>
        <Top
          title={'Inherit MU:Vault'}
          backgroundColor={BASE_BACKGROUND}
          left={true}
          onTouchBackButton={navigation.goBack}
        />
        <View>
          <Text style={s.title}>
            Please type in your{'\n'}Inheritance code from{'\n'}the insurance
            company.
          </Text>
          <Text style={s.inputTitle}>Inheritance code</Text>
          <View style={{ marginHorizontal: 23, marginTop: 10 }}>
            <BasicTextInput
              update={(e: string) => {
                setInheritCode(e);
              }}
              blur={(e: string) => { }}
              style={{
                paddingVertical: Platform.OS === 'ios' ? 16 : 5,
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
        </View>
        <View
          style={{
            marginTop: 20,
            width: '100%',
            paddingHorizontal: 22,
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
      </ScrollView>
    </>
  );
};

export default InputInheritCode;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    paddingBottom: Platform.OS === 'ios' ? 43 : 20,
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
