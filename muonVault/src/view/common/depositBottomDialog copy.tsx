import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const DepositBottomDialog = (props: any) => {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      if (props.cancel) props.cancel();
    });
  };

  function startAnimationlikeHeart() {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(finish => {
      setVisible(props.visible);
    });
  }

  useEffect(() => {
    if (props.visible) {
      fadeIn();
      startAnimationlikeHeart();
    } else setVisible(props.visible);
  }, [props.visible]);

  return (
    <>
      {props.visible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: 'rgba(0,0,0,.5)', opacity: fadeAnim},
          ]}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={1}
            key={props.key}
            onPress={() => {
              fadeOut();
            }}>
            <Animatable.View
              animation="pulse"
              delay={0}
              duration={200}
              style={{
                paddingVertical: 25,
                marginHorizontal: 20,
                backgroundColor: '#ffffff',
                borderRadius: 15,
              }}>
              <View style={{paddingHorizontal: 24}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: '15%'}} />
                  <View style={{width: '70%', alignItems: 'center'}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                      구매정보
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{width: '15%', alignItems: 'flex-end'}}
                    onPress={() => {
                      if (props.cancel) props.cancel();
                    }}></TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text style={[s.contentText, {marginTop: 20}]}>
                    언제 어디서 이 와인을 샀는지 구매 정보를 기록해두시면, 다음
                    와인을 살때 도움이 될꺼에요!
                  </Text>
                </View>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

export default DepositBottomDialog;

const s = StyleSheet.create({
  contentText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
    lineHeight: 20,
  },
});
