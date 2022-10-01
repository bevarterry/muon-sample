import AnimatedLottieView from 'lottie-react-native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
const scan_loading = require('../../../assets/lottie/mu-global-loading.json');

type stateProps = {
  action: boolean;
};

const GlobalLoading: React.FC<React.PropsWithChildren<stateProps>> = ({
  action,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(action);
  }, [action]);
  return (
    <>
      {visible && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 3,
              backgroundColor: 'rgba(217,217,217,.8)',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <AnimatedLottieView style={{ width: 300, height: 300 }} source={scan_loading} autoPlay loop={true} />
        </View>
      )}
    </>
  );
};

export default GlobalLoading;
