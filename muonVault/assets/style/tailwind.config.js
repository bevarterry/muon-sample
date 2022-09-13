// tailwind.config.js
const {plugin} = require('twrnc');
const {getStatusBarHeight} = require('react-native-status-bar-height');
const {moderateScale, fontScale} = require('../../src/util/Scaling');
const {Dimensions, Platform} = require('react-native');
const DeviceInfo = require('react-native-device-info');
const {initialWindowMetrics} = require('react-native-safe-area-context');

module.exports = {
  important: true,
  theme: {
    extend: {
      zIndex: {
        1: 1,
      },
      colors: {
        tabNavi: {
          active: '#e02440',
          normal: '#222222',
        },
        chilling: {
          bg: '#f8fafc',
          red: '#e02440',
          status: '#25272d',
        },
        gray: {
          100: '#f2f4f6',
          200: '#e0e2e4',
          222: '#222222',
          444: '#444444',
          666: '#666666',
          999: '#999999',
          ac: '#acacac',
        },
      },
      fontSize: {
        10: `${fontScale(10)}`,
        12: `${fontScale(12)}`,
        13: `${fontScale(13)}`,
        14: `${fontScale(14)}`,
        15: `${fontScale(15)}`,
        16: `${fontScale(16)}`,
        17: `${fontScale(17)}`,
        18: `${fontScale(18)}`,
        20: `${fontScale(20)}`,
        24: `${fontScale(24)}`,
      },
      borderRadius: {
        '4p': '4px',
        '5p': '5px',
        '6p': '6px',
        '8p': '8px',
        '12p': '12px',
        '15p': '15px',
        '20p': '20px',
      },
      borderWidth: {
        1: '1px',
      },
      width: {
        screen: `${Dimensions.get('window').width}`,
      },
      height: {
        1: 1,
        screen: `${Dimensions.get('window').height}`,
        header: `${moderateScale(56)}`,
        'full-without-header-status': `${Dimensions.get('window').height - getStatusBarHeight() - moderateScale(56)}`,
      },
      spacing: {
        1: `${1}`,
        s2: `${moderateScale(2)}`,
        2: `${2}`,
        s3: `${moderateScale(3)}`,
        3: `${3}`,
        s4: `${moderateScale(4)}`,
        s5: `${moderateScale(5)}`,
        s6: `${moderateScale(6)}`,
        6: `${6}`,
        7: `${7}`,
        s7: `${moderateScale(7)}`,
        s8: `${moderateScale(8)}`,
        s10: `${moderateScale(10)}`,
        10: `${10}`,
        s11: `${moderateScale(11)}`,
        12: `${12}`,
        s12: `${moderateScale(12)}`,
        s13: `${moderateScale(13)}`,
        s14: `${moderateScale(14)}`,
        s15: `${moderateScale(15)}`,
        s16: `${moderateScale(16)}`,
        s18: `${moderateScale(18)}`,
        s20: `${moderateScale(20)}`,
        s21: `${moderateScale(21)}`,
        s22: `${moderateScale(22)}`,
        23: `${23}`,
        s24: `${moderateScale(24)}`,
        s25: `${moderateScale(25)}`,
        s26: `${moderateScale(26)}`,
        s30: `${moderateScale(30)}`,
        s31: `${moderateScale(31)}`,
        s32: `${moderateScale(32)}`,
        s34: `${moderateScale(34)}`,
        s35: `${moderateScale(35)}`,
        s37: `${moderateScale(37)}`,
        s40: `${moderateScale(40)}`,
        40: `${40}`,
        s42: `${moderateScale(42)}`,
        s48: `${moderateScale(48)}`,
        s50: `${moderateScale(50)}`,
        s52: `${moderateScale(52)}`,
        s55: `${moderateScale(55)}`,
        s56: `${moderateScale(56)}`,
        60: `${60}`,
        s60: `${moderateScale(60)}`,
        s62: `${moderateScale(62)}`,
        s68: `${moderateScale(68)}`,
        s70: `${moderateScale(70)}`,
        s80: `${moderateScale(80)}`,
        s110: `${moderateScale(110)}`,
        s120: `${moderateScale(120)}`,
        s240: `${moderateScale(240)}`,
        s250: `${moderateScale(250)}`,
        s320: `${moderateScale(320)}`,
        status: `${getStatusBarHeight()}`,
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        'abs-fill': {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        'p-status': {
          paddingTop: getStatusBarHeight() + moderateScale(10),
        },
        'pb-safeArea': {
          paddingBottom: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? initialWindowMetrics.insets.bottom : 0,
        },
        'pb-tabNavi': {
          paddingBottom: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 4 : 8,
        },
      });
    }),
  ],
};
