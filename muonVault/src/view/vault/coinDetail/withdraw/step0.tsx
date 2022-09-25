import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import {Vault} from '../../../../model/vaults';
import {RootState} from '../../../../store/modules';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
  MAIN_BORDER_COROR,
} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import ButtonComponent from '../../../common/ButtonComponent';
import TextInputComponent from '../../../common/TextInputComponent';
import {WITHDRAW_INPUT_AMOUNT} from '../../../constantProperties';
const qr_icon = require('../../../../../assets/image/qr_icon.png');

type Props = {
  updateStep: Function;
  updateToAddress: Function;
  selectVault: Function;
  vault: Vault;
};
const Step0: React.FC<React.PropsWithChildren<Props>> = ({
  updateStep,
  updateToAddress,
  selectVault,
  vault,
}) => {
  const vaultsStore = useSelector((root: RootState) => root.vaultsStore);
  const [toAddress, setToAddress] = useState('');

  const isActiveNextButton = () => {
    return toAddress !== '';
  };

  const candidateVaults = () => {
    return (
      <View style={s.candidateVaults}>
        {vaultsStore.vaults.map((element, index) => {
          if (element.idx === 'NEW_CREATE') return;
          if (element.idx === vault.idx) return;

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={{marginRight: 10}}
              onPress={() => {
                selectVault(element);
                setToAddress(element.name);
              }}>
              <BasicBadge
                title={element.name}
                paddingHorizontal={12}
                paddingVertical={4}
                backgroundColor={element.color}
                fontColor={'#ffffff'}
                fontSize={12}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <>
      <TextInputComponent
        propsValue={toAddress}
        leftComponent={
          <BasicBadge
            title={'To'}
            paddingHorizontal={12}
            paddingVertical={4}
            backgroundColor={MAIN_BLACK}
            fontColor={'#ffffff'}
            fontSize={12}
          />
        }
        rightComponent={
          <View style={{width: 16}}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 16,
                height: 16,
              }}
              source={qr_icon}
            />
          </View>
        }
        placeHolder={'Enter withdrawal address or ENS'}
        backgroundColor={'#ffffff'}
        update={(e: string) => {
          updateToAddress(e);
          setToAddress(e);
        }}
        active={toAddress !== ''}
        blur={(e: string) => {}}
      />
      {!isActiveNextButton() && (
        <View style={s.candidateVaultsWrapper}>{candidateVaults()}</View>
      )}

      <View style={{width: '100%', paddingHorizontal: 20, marginTop: 50}}>
        <ButtonComponent
          title="Next"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={DIMED_GRAY}
          borderRadius={20}
          activeColor={isActiveNextButton() ? MAIN_BLACK : undefined}
          activeFontColor={isActiveNextButton() ? CC_WHITE : undefined}
          bodyColor={BASE_BUTTON}
          click={() => {
            if (isActiveNextButton()) {
              updateStep(WITHDRAW_INPUT_AMOUNT);
            }
          }}
        />
      </View>
    </>
  );
};

export default Step0;

const s = StyleSheet.create({
  candidateVaultsWrapper: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  candidateVaults: {
    paddingVertical: 23,
    backgroundColor: CC_WHITE,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: MAIN_BORDER_COROR,
    opacity: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
