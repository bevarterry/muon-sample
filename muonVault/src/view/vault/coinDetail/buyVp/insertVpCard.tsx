import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CoinDetailType} from '~/model/coin';
import {
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
  MAIN_BORDER_COROR,
} from '../../../ColorCode';
import BasicTextInput from '../../../common/basicTextInput';
const buy_vp_icon = require('../../../../../assets/image/buy_vp_icon.png');
type Props = {updateInput: Function; fucus?: Function; coin: CoinDetailType};
const InsertVpCard: React.FC<React.PropsWithChildren<Props>> = ({
  updateInput,
  fucus,
  coin,
}) => {
  const [posibleBuyAmount, setPosibleBuyAmount] = useState(0);
  const [initValue, setInitValue] = useState(0);
  const muDollarRatio = 0.01;
  useEffect(() => {
    setPosibleBuyAmount((coin.ratio * coin.value) / muDollarRatio);
  }, [coin]);

  return (
    <>
      <View style={s.wrapper}>
        <FastImage
          resizeMode="contain"
          style={{
            width: 21,
            height: 22,
          }}
          source={buy_vp_icon}
        />
        <BasicTextInput
          numberOnly={true}
          maxValue={posibleBuyAmount}
          update={(e: string) => {
            if (!e) {
              setInitValue(0);
              updateInput(0);
              return;
            }
            let inputValue = parseInt(e);
            if (inputValue > posibleBuyAmount) inputValue = posibleBuyAmount;

            updateInput(inputValue);
          }}
          blur={(e: string) => {}}
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
          focusYn={fucus}
          initValue={initValue}
          postfix="MU:P"
          textContentStyle={{
            fontSize: 22,
            fontWeight: '700',
          }}
        />
        <View style={[s.row]}>
          <Text style={s.value}>
            {}Maximum {Number(posibleBuyAmount).toFixed(0)}MU:P
          </Text>
        </View>
      </View>
    </>
  );
};

export default InsertVpCard;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 44,
    paddingBottom: 15,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  row: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: DIMED_GRAY,
  },
});
