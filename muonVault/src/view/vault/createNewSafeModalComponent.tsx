import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
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
    //@ts-ignore
    dispatch(createNewVault(safeName));
    if (closeModal) closeModal();
  }
  return (
    <>
      <View style={s.contentContainer}>
        <Text style={s.title}>Create a new SAFE</Text>

        <View
          style={{
            marginTop: 60,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 38,
          }}>
          <BasicTextInput
            update={(e: string) => {
              setSafeName(e);
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
            initValue={safeName}
            textContentStyle={{
              fontSize: 22,
              fontWeight: '700',
            }}
          />
          <View style={{height: 33}} />
          <ButtonComponent
            title="Create"
            fontSize={18}
            width={'100%'}
            borderColor={BASE_BUTTON}
            titleColor={DIMED_GRAY}
            paddingVertical={21}
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
    fontSize: 24,
    fontWeight: '700',
  },
  address: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 7,
  },
  close: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },
});
