import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createNewVault} from '~/store/action/VaultAction';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  BASE_GRAY_BACKGROUND,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import BasicTextInput from '../common/basicTextInput';
import ButtonComponent from '../common/ButtonComponent';
import { mScale } from '../scaling';

type Props = {
  closeModal?: Function;
};

const CreateNewSafeModalComponent: React.FC<React.PropsWithChildren<Props>> = ({
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [safeName, setSafeName] = useState('');

  const isActiveDoneButton = () => {
    return safeName !== '';
  };

  function requestSaveNewSafeAPI() {

    if(!isActiveDoneButton()) return ;
    //@ts-ignore
    dispatch(createNewVault(safeName));
    if (closeModal) closeModal();
  }

  useEffect(() => {
    const backAction = () => {
      if (closeModal) closeModal();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <>
    
      <View style={s.contentContainer}>
        <Text style={s.title}>Create a new SAFE</Text>

        <View
          style={{
            marginTop: mScale(60),
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: mScale(38),
          }}>
          <BasicTextInput
            update={(e: string) => {
              setSafeName(e);
            }}
            blur={(e: string) => {}}
            style={{
              paddingVertical: Platform.OS === 'ios' ? mScale(16): mScale(5),
              width: '100%',
              borderTopWidth: 0,
              borderBottomWidth: mScale(3),
              borderColor: MAIN_BLACK,
              borderRightWidth: 0,
              borderRadius: 0,
              borderLeftWidth: 0,
              marginTop: mScale(10),
            }}
            initValue={safeName}
            textContentStyle={{
              fontSize: mScale(22),
              color: '#000000',
              fontWeight: '700',
            }}
          />
          
          <View style={{height: mScale(33)}} />
          <ButtonComponent
            title="Create"
            fontSize={18}
            width={'100%'}
            borderColor={BASE_BUTTON}
            titleColor={DIMED_GRAY}
            paddingVertical={mScale(21)}
            borderRadius={16}
            activeColor={isActiveDoneButton() ? MAIN_BLACK : BASE_BUTTON}
            activeFontColor={isActiveDoneButton() ? CC_WHITE : DIMED_GRAY}
            bodyColor={BASE_BUTTON}
            click={requestSaveNewSafeAPI}
          />
        </View>
        
        <TouchableOpacity
          onPress={() => {
            if (closeModal) closeModal();
          }}>
          <Text style={s.close}>Cancel</Text>
        </TouchableOpacity>
        
      </View>
      
    </>
  );
};

export default CreateNewSafeModalComponent;

const s = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: mScale(24),
    fontWeight: '700',
  },
  address: {
    fontSize: mScale(12),
    fontWeight: '500',
    lineHeight: mScale(24),
    marginTop: mScale(7),
  },
  close: {
    marginTop: mScale(20),
    fontSize: mScale(20),
    fontWeight: '700',
  },
});
