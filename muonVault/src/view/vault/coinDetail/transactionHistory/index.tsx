import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { TxHistory } from '~/model/transactionHistory';
import { BASE_BACKGROUND, CC_WHITE, DIMED_GRAY, MAIN_BLACK, MAIN_BORDER_COROR } from '~/view/ColorCode';
import BasicBadge from '~/view/common/basicBadge';
import TextInputComponent from '~/view/common/TextInputComponent';
import Top from '../../../common/top';
import TransactionHistoryCard from '../transactionHistoryCard';
const qr_icon = require('../../../../../assets/image/qr_icon.png');
const search_icon = require('../../../../../assets/image/search_icon.png');
const TransactionHistory = (props: any) => {
  const [histories, setHistories] = useState<Array<TxHistory>>([]);
  const [symbol, setSymbol] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    const {histories, coin} = props.route.params;
    setHistories(histories);
    setSymbol(symbol);
  }, [props.route.params]);


  return (
    <>

      <ScrollView contentContainerStyle={s.wrapper}>
        <View style={{paddingHorizontal: 20, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
        <TextInputComponent
            textAlign={'left'}
            prooStyle={{
              width: '100%',
              borderRadius: 0,
              paddingLeft: 0,
              borderColor: BASE_BACKGROUND,
              borderBottomColor: MAIN_BLACK,
              borderWidth: 2,
              paddingRight: 10,
              paddingBottom: 12
            }}
              propsValue={''}
              rightComponent={
                <View style={{
                  borderColor: MAIN_BORDER_COROR,
                  borderWidth: 2, paddingHorizontal: 17.45, paddingVertical: 9.4, borderRadius: 20}}>
                  <FastImage
                    resizeMode="contain"
                    style={{
                      width: 13,
                      height: 13,
                    }}
                    source={search_icon}
                  />
                </View>
              }
              placeHolder={'Enter a keyword to search for'}
              backgroundColor={BASE_BACKGROUND}
              update={(e: string) => {
                
              }}
              blur={(e: string) => {}}
            />
        </View>
        
        {histories && histories.length > 0 && (
          <View style={s.historiesWrapper}>
            {histories.map((history: TxHistory, index: number) => {
              return (
                <TransactionHistoryCard
                  history={history}
                  key={index}
                  symbol={symbol}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
      <Top
          title={'History Search'}
          backgroundColor={BASE_BACKGROUND}
          left={true}
          onTouchBackButton={navigation.goBack}
        />
    </>
  );
};

export default TransactionHistory;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -2,
    marginTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    display: 'flex',
    alignItems: 'center',
  },
  totalValueDollar: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
    marginBottom: 24,
  },
  coinRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 6,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
    paddingHorizontal: 24,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 3,
  },
  dollarValue: {
    fontSize: 14,
    fontWeight: '400',
    color: DIMED_GRAY,
    marginBottom: 3,
  },
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21.4,
  },
  searchIcon: {
    width: 48,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  historiesWrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
});
