import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
  MAIN_BORDER_COROR,
} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import ButtonComponent from '../../../common/ButtonComponent';
import PilotWithdrawBottomDialog from './pilotWithdrawBottomDialog';
import SummaryCard from '../component/summaryCard';
import {CoinDetailType} from '~/model/coin';
import {Vault} from '~/model/vaults';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/modules';
import {requestEtherWithdrawConfirm} from '~/bc/VaultEtherApi';
import {BNB_SYMBOL, ETH_SYMBOL, INSUFFICIENT_FUNDS} from '~/view/constantProperties';
import {requestBnbWithdrawConfirm} from '~/bc/VaultBinanceApi';
import VaultApi from '../../../../api/Vault';
import { setGlobalLoadingState } from '~/store/modules/GlobalLoadingReducer';
import Toast from 'react-native-simple-toast';
import { CompleteWithdrawProps } from './completeWithdraw';
import { checkBiometic } from '~/view/auth/biometic';
import CoinDetail from '..';
import GlobalLoading from '~/view/common/GlobalLoading';

const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 34) / 2;
type Props = {
  props: {
    coin: CoinDetailType;
    amount: string;
    fromVault: Vault;
    toAddress: string;
  };
};
const SendToAddress: React.FC<React.PropsWithChildren<Props>> = ({props}) => {
  const globalLoadingStateStore = useSelector(
    (root: RootState) => root.globalLoadingState,
  );
  const [isVisiblePilotSendButton, setIsVisiblePilotSendButton] = useState(true);
  const pilotWithdrawModalRef = useRef();
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  
  const pilotAmount  = (1 / props.coin.ratio).toFixed(8);
  const [remainAmount, setRemainAmount] = useState(0);
  
  useEffect(()=>{
    setRemainAmount(Number(props.amount));
  }, [props.amount])



  const isOverPilotVue = () => {
    // 100 달러 기준
    return (100 - totalAmountToDollar() < 0);
  }

  const totalAmountToDollar = () => {
    return (props.coin.ratio * Number(props.amount));
  }


  async function sendAll() {
    if(!await checkBiometic()) {
      return Toast.show(`생체인증에 실패했습니다.`, Toast.SHORT);
    }

    try {
      dispatch(setGlobalLoadingState(true));
      const response:string = await requestWithdrawConfirm(remainAmount);
      if(response.includes(INSUFFICIENT_FUNDS)) {
      
        const token = response.split(',');
        dispatch(setGlobalLoadingState(false));
        return Alert.alert('Insufficient balance.', `A transaction fee of at least ${token[1]} is required.`)
      }
      sendTxid(response, false);
    } catch (error) {
      dispatch(setGlobalLoadingState(false));
    }
  }


  async function sendPilot() {
    if(!await checkBiometic()) {
      return Toast.show(`생체인증에 실패했습니다.`, Toast.SHORT);
    }

    try {
      dispatch(setGlobalLoadingState(true));
      const response:string = await requestWithdrawConfirm(Number(pilotAmount));

      if(response.includes(INSUFFICIENT_FUNDS)) {
      
        const token = response.split(',');
        dispatch(setGlobalLoadingState(false));
        return Alert.alert('Insufficient balance.', `A transaction fee of at least ${token[1]} is required.`)
      }

      setRemainAmount(remainAmount - Number(pilotAmount));
      sendTxid(response, true);

    } catch (error) {
      dispatch(setGlobalLoadingState(false));
    }
  }

  function sendTxid(txid: string, isPilot: boolean) {
    console.log(txid)
    VaultApi.sendTxid({
      txid: txid,
      symbol: props.coin.symbol,
    })
      .then(res => {
        console.log(txid)
        dispatch(setGlobalLoadingState(false));
        Toast.show(`전송 요청을 완료. 컨펌이후 잔고 변경.`, Toast.SHORT);
        
        const param:CompleteWithdrawProps  = {
          from: props.fromVault.name,
          to: props.toAddress,
          estimateGasFee: 1000000,
          serviceFee: 1,
          amount: Number(props.amount),
          coin : props.coin
        }
        setIsVisiblePilotSendButton(false);

        console.log(txid, isPilot)
        if(!isPilot) navigation.replace('CompleteWithdraw', param);
        else {
          dispatch(setGlobalLoadingState(true));
        }
      })
      .catch(e => {
        dispatch(setGlobalLoadingState(false));
      });
  }


  async function requestWithdrawConfirm(value: number) {
    let res;

    if (props.coin.symbol === ETH_SYMBOL) {
      res = await requestEtherWithdrawConfirm(
        props.toAddress,
        String(value),
        props.coin.privateKey,
        props.coin.contractAddress,
      );
    } else if (props.coin.symbol === BNB_SYMBOL) {
      res = await requestBnbWithdrawConfirm(
        props.toAddress,
        String(value),
        props.coin.privateKey,
        props.coin.contractAddress,
      );
    }
    return res;
  }

  return (
    <>
      <SummaryCard
        serviceFee={10}
        estimateGasFee={10}
        totalComponent={
          <>
            <BasicBadge
              title={'Total'}
              paddingHorizontal={12}
              paddingVertical={4}
              backgroundColor={MAIN_BLACK}
              fontColor={'#ffffff'}
              fontSize={12}
            />
            <Text style={s.totalValue}>${totalAmountToDollar().toFixed(2)}</Text>
          </>
        }
      />
      <Text
        style={{
          textAlign: 'center',
          paddingHorizontal: 27,
          marginTop: 20,
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 18.2,
        }}>
        Pilot withdraw is recommended to avoid an unintended transaction to a
        wrong address. $1 will be sent to the address above upon clicking “pilot
        withdraw”. Please check with the receiving end before full withdrawal.
        Gas fee will apply to the pilot withdraw.
      </Text>

      <View
        style={{
          marginTop: 30,
          position: 'absolute',
          bottom: 43,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 12,
        }}>

          {(isOverPilotVue() && isVisiblePilotSendButton ) &&
          <>
            <ButtonComponent
              title="Send $1"
              width={buttonWidth}
              borderColor={BASE_BUTTON}
              titleColor={CC_WHITE}
              paddingVertical={21}
              borderRadius={16}
              bodyColor={MAIN_BLACK}
              click={() => {
                //@ts-ignore
                pilotWithdrawModalRef.current.openModal();
              }}/>
            <View style={{width: 10}} />
            </>
          }

        <ButtonComponent
          title="Send All"
          width={isOverPilotVue() && isVisiblePilotSendButton ? buttonWidth : '100%'}
          borderColor={BASE_BUTTON}
          titleColor={isOverPilotVue() ? MAIN_BLACK : CC_WHITE}
          paddingVertical={21}
          borderRadius={16}
          bodyColor={isOverPilotVue() ? BASE_BUTTON : MAIN_BLACK}
          click={sendAll}
        />
      </View>
      <PilotWithdrawBottomDialog ref={pilotWithdrawModalRef} send={()=>{
        //@ts-ignore
        pilotWithdrawModalRef.current.closeModal();
        sendPilot();
        console.log('pilotAmount', pilotAmount);
        console.log('remainAmount', remainAmount);
      }}/>
    </>
  );
};

export default SendToAddress;

const s = StyleSheet.create({
  withdrawSummary: {
    marginHorizontal: 8,
    paddingVertical: 40,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
  },
});
