import ReactNativeBiometrics, { BiometryTypes, TouchID } from 'react-native-biometrics'
import Toast from 'react-native-simple-toast';


const biometric = new ReactNativeBiometrics;

export async function checkBiometic () {
    const posibleBiometic = await checkFingerprint();
    if(!posibleBiometic) Toast.show(`해당 단말기는 생체인증이 지원되지않아, 이용이 불가합니다.`, Toast.SHORT);
    
    return await simplePrompt();
  }



export function simplePrompt (): Promise<boolean> {
    return new Promise((resolve, reject) => {
        biometric.simplePrompt({promptMessage: '지문인증'})
            .then((resultObject: any) => {
            const { success } = resultObject

            if (success) {
                resolve(true);
                Toast.show ('생체인증에 성공했습니다')
            } else {
                resolve(false);
                
                Toast.show ('생체인증을 취소했습니다.')
            }
            })
            .catch(() => {
                reject(false);
                console.log('biometrics failed')
            })
    })
  }

export function checkFingerprint (): Promise<boolean> {
    return new Promise((resolve, reject) => {
        biometric.isSensorAvailable().then((resultObject) => {
        const { available, biometryType } = resultObject
    
        if (available && biometryType === BiometryTypes.TouchID) {
            console.log("TouchID is supported");
            resolve(true);
        } else if (available && biometryType === BiometryTypes.FaceID) {
            console.log("FaceID is supported");
            resolve(true);
        } else if (available && biometryType === BiometryTypes.Biometrics) {
            console.log("Biometrics is supported");
            resolve(true);
        } else {
            Toast.show ("Biometrics not supported", Toast.LONG);
            resolve(false);
        }
        }) 
    })
}