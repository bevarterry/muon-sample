import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const withdraw_icon = require('../../../../assets/image/withdraw_icon.png');
const deposit_icon = require('../../../../assets/image/deposit_icon.png');
const buy_vp_icon = require('../../../../assets/image/buy_vp_icon.png');
const {width, height} = Dimensions.get('window');
const paddingHorizontal = 25;
const gap = 12;

type Props = {
  onPress: Function;
};
const TransactionButtonContainer: React.FC<React.PropsWithChildren<Props>> = ({
  onPress,
}) => {
  return (
    <View style={s.trasactionComponentWrapper}>
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.7}
        onPress={() => onPress('Deposit')}>
        <FastImage
          resizeMode="contain"
          style={s.buttonIcon}
          source={deposit_icon}
        />
        <Text style={s.buttonText}>Deposit</Text>
      </TouchableOpacity>
      <View style={{width: gap}} />
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.7}
        onPress={() => onPress('Withdraw')}>
        <FastImage
          resizeMode="contain"
          style={s.buttonIcon}
          source={withdraw_icon}
        />
        <Text style={s.buttonText}>Withdraw</Text>
      </TouchableOpacity>
      <View style={{width: gap}} />
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.7}
        onPress={() => onPress('BuyVP')}>
        <FastImage
          resizeMode="contain"
          style={s.buttonIcon}
          source={buy_vp_icon}
        />
        <Text style={s.buttonText}>Buy VP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionButtonContainer;

const s = StyleSheet.create({
  trasactionComponentWrapper: {
    paddingHorizontal: paddingHorizontal,
    marginTop: 20,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    width: (width - paddingHorizontal * 2 - gap * 2) / 3,
    height: (width - paddingHorizontal * 2 - gap * 2) / 3,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E6E6E6',
    backgroundColor: '#ffffff',
    display: 'flex',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '700',
  },
  buttonIcon: {
    width: 22,
    height: 22,
  },
});
