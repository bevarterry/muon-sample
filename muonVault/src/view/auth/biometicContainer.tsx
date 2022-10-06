import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
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
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import Top from '../common/top';
import Toast from 'react-native-simple-toast';
import { checkBiometic } from './biometic';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const INIT_AUTH = "INIT_AUTH"
export const TRANSFER = "TRANSFER"
export const BUY_POINT = "BUY_POINT"
const BiometicContainer = (props: any) => {
  const navigation: any = useNavigation();

  useEffect(()=>{
    openBiometicSystemModal();
  }, [])

  async function openBiometicSystemModal() {
    const result = await checkBiometic()

    
    if(!result) {
      props.route.params.reject();
      navigation.goBack();
    }else {
      props.route.params.pass();
      navigation.goBack();
    }
  }

  return (
    <>
          <Top
            left={false}
            title={'Authentication'}
            backgroundColor={BASE_BACKGROUND}
            onTouchBackButton={navigation.goBack}
          />
        <View style={s.wrapper}>

          {props.route.params.purpose === INIT_AUTH && 
          <>
          <Text style={s.title}>{`We Found your MU:Vault !`}</Text>
          <View style={{height: 7}}/>
          <Text style={s.inputTitle}>{`Authentication yourself with your Face ID or Fingerprint before MU:Vault beign brought to your phone.`}</Text>
          </>
            
          }
          {props.route.params.purpose === TRANSFER && 
            <Text style={[s.inputTitle, {textAlign: 'center'}]}>{`Please approve purchase using faceID.${'\n'}(fingerprint)`}</Text>
          }
                    {props.route.params.purpose === BUY_POINT && 
            <Text style={[s.inputTitle, {textAlign: 'center'}]}>{`Please approve purchase using faceID.${'\n'}(fingerprint)`}</Text>
          }
          
        </View>
    </>
  );
};

export default BiometicContainer;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingHorizontal: 23,
    height: '100%',
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
  },
  inputTitle: {
    marginTop: 22,
    fontSize: 16,
    fontWeight: '400',
    color: DIMED_GRAY,
  },
});
