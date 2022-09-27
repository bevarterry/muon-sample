import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import {CoinDetailType} from '~/model/coin';
import {BASE_BACKGROUND, CC_WHITE, MAIN_BLACK} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import ButtonComponent from '../../../common/ButtonComponent';
import SummaryCard from '../component/summaryCard';

export interface CompleteWithdrawProps {
  from: string;
  to: string;
  estimateGasFee: number;
  serviceFee: number;
  coin: CoinDetailType;
  amount: number;
}

const CompleteWithdraw = (props: any) => {
  const navigation: any = useNavigation();
  const [item, setItems] = useState<CompleteWithdrawProps>({
    from: '',
    to: '',
    amount: 0,
    estimateGasFee: 0,
    serviceFee: 0,
    coin: {
      value: 0,
      symbol: '',
      ratio: 0,
    },
  });

  useEffect(() => {
    if (props.route.params.from) {
      setItems(props.route.params);
    }
  }, []);

  const badge = (title: string) => {
    return (
      <BasicBadge
        title={title}
        paddingHorizontal={12}
        paddingVertical={4}
        backgroundColor={MAIN_BLACK}
        fontColor={'#ffffff'}
        fontSize={12}
      />
    );
  };
  return (
    <>
      <View style={s.wrapper}>
        <Text style={s.completeText}>Complete!</Text>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 38,
            marginTop: 24,
            marginBottom: 30,
          }}>
          {item.amount} {item.coin.symbol} ($
          {Number(item.amount * item.coin.ratio).toFixed(0)}) has been
          transferred to the {item.to}
        </Text>

        <SummaryCard
          amountComponent={
            <>
              {badge('Amount')}
              <Text style={s.componentText}>
                {item.amount} {item.coin.symbol}
              </Text>
            </>
          }
          toComponent={
            <>
              {badge('To')}
              <Text style={s.componentText}>{item.to}</Text>
            </>
          }
          fromComponent={
            <>
              {badge('From')}
              <Text style={s.componentText}>{item.from}</Text>
            </>
          }
          totalComponent={
            <>
              {badge('Total')}
              <Text style={s.componentText}>
                ${Number(item.amount * item.coin.ratio).toFixed(0)}
              </Text>
            </>
          }
        />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 22,
          position: 'absolute',
          bottom: 50,
        }}>
        <ButtonComponent
          title="Done"
          width="100%"
          borderColor={MAIN_BLACK}
          titleColor={CC_WHITE}
          borderRadius={20}
          bodyColor={MAIN_BLACK}
          click={() => {
            navigation.pop(1);
            navigation.pop(2);
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};

export default CompleteWithdraw;

const s = StyleSheet.create({
  wrapper: {
    paddingTop: getStatusBarHeight(),
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingHorizontal: 13,
    display: 'flex',
    alignItems: 'center',
  },
  completeText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 28,
  },
  componentText: {
    fontSize: 22,
    fontWeight: '700',
  },
});
