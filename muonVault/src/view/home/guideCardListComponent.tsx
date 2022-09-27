import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CC_WHITE} from '../ColorCode';
import GuideCard from './guideCard';
const home_card_1_img = require('../../../assets/image/home_card_1_img.png');
const muon_subTitle = require('../../../assets/image/muon_subTitle.png');

const {width, height} = Dimensions.get('window');
const paddingHorizontalLength = 27;

const GuideCardListComponent = () => {
  const [page, setPage] = useState(0);
  const components = [{id: '0'}, {id: '1'}, {id: '2'}, {id: '3'}];

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x /
        (width - (paddingHorizontalLength * 2 - 15)),
    );

    setPage(newPage);
  };

  return (
    <View
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        contentContainerStyle={s.wrapper}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={components}
        keyExtractor={item => item.id}
        decelerationRate="fast"
        snapToAlignment={'start'}
        snapToInterval={width - (paddingHorizontalLength * 2 - 15)}
        onScroll={onScroll}
        pagingEnabled
        renderItem={({item, index}) => {
          return <GuideCard id={item.id} />;
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
        {Array.from({length: components.length}, (_, i) => i).map(i => (
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

export default GuideCardListComponent;

const s = StyleSheet.create({
  wrapper: {
    paddingLeft: paddingHorizontalLength,
    paddingRight: paddingHorizontalLength - 15,
  },
});
