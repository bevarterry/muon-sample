import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import PilotWithdrawBottomDialog from './pilotWithdrawBottomDialog';
import SummaryCard from '../component/summaryCard';
import {CoinDetailType} from '~/model/coin';
import {Vault} from '~/model/vaults';

const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 34) / 2;
type Props = {
  prop: {
    coin: CoinDetailType;
    amount: number;
    fromVault: Vault;
    toVault: Vault;
    toAddress: string;
  };
};
const SendToAddress: React.FC<React.PropsWithChildren<Props>> = ({prop}) => {
  const pilotWithdrawModalRef = useRef();
  const navigation = useNavigation();

  return (
    <>
      <SummaryCard
        totalComponent={
          <>
            <BasicBadge
              title={'Total'}
              paddingHorizontal={12}
              paddingVertical={4}
              backgroundColor={MAIN_BLACK}
              fontColor={'#ffffff'}
              fontSize={12}
            />
            <Text style={s.totalValue}>$19,723.10</Text>
          </>
        }
      />
      <Text
        style={{
          textAlign: 'center',
          paddingHorizontal: 27,
          marginTop: 20,
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 18.2,
        }}>
        Pilot withdraw is recommended to avoid an unintended transaction to a
        wrong address. $1 will be sent to the address above upon clicking “pilot
        withdraw”. Please check with the receiving end before full withdrawal.
        Gas fee will apply to the pilot withdraw.
      </Text>

      <View
        style={{
          marginTop: 30,
          position: 'absolute',
          bottom: 43,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 12,
        }}>
        <ButtonComponent
          title="Pilot withdraw"
          width={buttonWidth}
          borderColor={BASE_BUTTON}
          titleColor={CC_WHITE}
          paddingVertical={21}
          borderRadius={16}
          bodyColor={MAIN_BLACK}
          click={() => {
            //@ts-ignore
            pilotWithdrawModalRef.current.openModal();
          }}
        />
        <View style={{width: 10}} />
        <ButtonComponent
          title="Full withdraw"
          width={buttonWidth}
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          paddingVertical={21}
          borderRadius={16}
          bodyColor={BASE_BUTTON}
          click={() => {
            //@ts-ignore
            navigation.replace('CompleteWithdraw', {
              from: '',
              to: '',
              symbol: '',
              estimateGasFee: 0,
              serviceFee: 0,
              totalAmount: 0,
            });
          }}
        />
      </View>
      <PilotWithdrawBottomDialog ref={pilotWithdrawModalRef} />
    </>
  );
};

export default SendToAddress;

const s = StyleSheet.create({
  withdrawSummary: {
    marginHorizontal: 8,
    paddingVertical: 40,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
  },
});
