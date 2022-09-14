import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Vault} from '../../model/vaults';
import {RootState} from '../../store/modules';
import {BASE_BACKGROUND, DIMED_GRAY} from '../ColorCode';
import ValutCard from './valutCard';

const {width, height} = Dimensions.get('window');
const paddingHorizontalLength = 17;

const ValutCardListComponent = () => {
  const [page, setPage] = useState(0);
  const valutsStore = useSelector((root: RootState) => root.vaultsStore);

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x /
        (width - (paddingHorizontalLength * 2 - 8)),
    );

    setPage(newPage);
  };

  useEffect(() => {}, [page]);

  return (
    <View
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        contentContainerStyle={s.wrapper}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={valutsStore.vaults}
        decelerationRate="fast"
        snapToAlignment={'start'}
        snapToInterval={width - (paddingHorizontalLength * 2 - 8)}
        onScroll={onScroll}
        pagingEnabled
        keyExtractor={(item: Vault, index) => String(index)}
        renderItem={({item}) => <ValutCard vault={item} />}
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
  valutCard: {
    width: width - paddingHorizontalLength * 2,
    paddingVertical: 20,
    marginRight: 8,
    backgroundColor: 'red',
    borderRadius: 14,
  },
});
