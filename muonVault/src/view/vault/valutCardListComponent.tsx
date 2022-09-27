import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Vault} from '../../model/vaults';
import {addDefaultVault} from '../../store/action/VaultAction';
import {RootState} from '../../store/modules';
import ValutCard from './valutCard';

const {width, height} = Dimensions.get('window');
const paddingHorizontalLength = 17;

const ValutCardListComponent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const valutsStore = useSelector((root: RootState) => root.vaultsStore);
  const scAssetsStore = useSelector((root: RootState) => root.scAssetsStore);

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x /
        (width - (paddingHorizontalLength * 2 - 8)),
    );

    setPage(newPage);
  };

  useEffect(() => {}, [page]);

  useEffect(() => {
    dispatch(
      //@ts-ignore
      addDefaultVault({
        bitcoin: scAssetsStore.bitcoin.totalValue,
        binanace: scAssetsStore.binance.totalValue,
        usdc: scAssetsStore.usdc.totalValue,
        ethereum: scAssetsStore.ethereum.totalValue,
        muon: scAssetsStore.muon.totalValue,
      }),
    );
  }, []);

  return (
    <View
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        contentContainerStyle={s.wrapper}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={valutsStore.vaults}
        keyExtractor={item => item.idx}
        decelerationRate="fast"
        snapToAlignment={'start'}
        snapToInterval={width - (paddingHorizontalLength * 2 - 8)}
        onScroll={onScroll}
        pagingEnabled
        renderItem={({item, index}) => {
          return (
            <>
              <ValutCard vault={item} />
            </>
          );
        }}
      />
      <View
        style={{
          marginTop: 14.04,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Array.from({length: valutsStore.vaults.length}, (_, i) => i).map(i => (
          <View
            key={i}
            style={{
              marginHorizontal: 2,
              width: 6,
              height: 6,
              borderRadius: 50,
              backgroundColor: page == i ? '#000000' : '#D9D9D9',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default ValutCardListComponent;

const s = StyleSheet.create({
  wrapper: {
    paddingLeft: paddingHorizontalLength,
    paddingRight: paddingHorizontalLength - 8,
  },
});
