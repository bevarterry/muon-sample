import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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
import {
  DEFAULT_WALLET,
  NEW_CREATE,
  WITHDRAW_INPUT_AMOUNT,
} from '../../../constantProperties';
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
    if (vaultsStore.vaults.length < 2) return <></>;
    return (
      <View style={s.candidateVaults}>
        <Text style={{fontSize: 12, fontWeight: '700'}}>Quick Select</Text>
        <ScrollView horizontal style={{marginLeft: 10}} showsHorizontalScrollIndicator={false}>
          {vaultsStore.vaults.map((element, index) => {
            if (element.idx === NEW_CREATE) return;
            if (element.idx === DEFAULT_WALLET) return;
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
                  borderRadius={8}
                  title={element.name}
                  borderWidth={1}
                  paddingHorizontal={25}
                  paddingVertical={10}
                  backgroundColor={CC_WHITE}
                  fontColor={'#161616'}
                  fontSize={12}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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

      <View style={{width: '100%', paddingHorizontal: 20, marginTop: 20}}>
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  candidateVaults: {
    paddingVertical: 23,
    borderRadius: 14,
    opacity: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 20,
  },
});
