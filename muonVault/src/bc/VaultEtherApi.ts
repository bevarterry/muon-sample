import '@ethersproject/shims';
import {BigNumber, ethers, providers} from 'ethers';
import { INSUFFICIENT_FUNDS } from '~/view/constantProperties';
import muVaultConfig from './mu_vault_ether_abi.json';

const provider = new providers.InfuraProvider(
  'goerli',
  '35e8ec5bb21b460bbb74bbe1ee56b2d5',
);

const baseGasLimit = 21000;

const isAddress = (address: string) => {
  return ethers.utils.isAddress(address);
};

const getBalanceEther = async (privateKey: string, contractAddress: string) => {
  const wallet = new ethers.Wallet(privateKey);

  const signer = wallet.connect(provider);

  let contract = await new ethers.Contract(
    contractAddress,
    muVaultConfig.abi,
    signer,
  );

  const balance = await contract.getBalance({
    from: wallet.address,
  });

  return ethers.utils.formatEther(balance);
};

const requestEtherWithdrawConfirm = async (
  to: string,
  value: string,
  privateKey: string,
  contractAddress: string,
) => {
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);
  const etherBalance = await provider.getBalance(wallet.address);

  let contract = new ethers.Contract(
    contractAddress,
    muVaultConfig.abi,
    signer,
  );

  const nonce = await provider.getTransactionCount(wallet.address);
  const gasPriceNumber = await provider.getGasPrice();
  const gasLimit = await contract.estimateGas.requestAndConfirmWithdraw(
    to,
    ethers.utils.parseUnits(value, 'ether'),
    {
      from: wallet.address,
    },
  );

  const gasLimitNumber = baseGasLimit + parseInt(gasLimit._hex, 16);
  const totalNeedValue = Number(gasLimitNumber*Number(gasPriceNumber)) + Number(parseToWei(Number(value)));

  console.log('출금요청 to', to);
  console.log('출금요청 value', value);
  console.log('출금요청 privateKey', privateKey);
  console.log('출금요청 contractAddress', contractAddress);
  console.log('출금요청 gasPriceNumber', gasPriceNumber);
  console.log('이더리잔액', parseInt(etherBalance._hex, 16));
  console.log('필요한가스', Number(gasLimitNumber*Number(gasPriceNumber)));
  console.log('전송할이더', parseToWei(Number(value)));
  console.log('필요한총액', totalNeedValue);
  console.log('출금요청 nonce', nonce);
  
  if(Number(parseInt(etherBalance._hex, 16)) <  Number(gasLimitNumber*Number(gasPriceNumber))){
    return INSUFFICIENT_FUNDS+","+parseWeiToEther( Number(gasLimitNumber*Number(gasPriceNumber)));
  }

  let receipt;
  try {
    receipt = await contract.requestAndConfirmWithdraw(
      to,
      ethers.utils.parseUnits(value, 'ether'),
      {
        from: wallet.address,
        nonce: nonce,
        gasLimit: ethers.utils.hexlify(gasLimitNumber),
        gasPrice: ethers.utils.hexlify(gasPriceNumber),
      },
    );

    console.log(JSON.stringify(receipt));
  } catch (err) {
    console.error(JSON.stringify(err));
  }
  console.log('[ BC 전송 트랜잭션] ', receipt.hash);
  return receipt.hash;
};

const parseToEther = (value: number) => {
  if (!value) return '0.0';

  return ethers.utils.formatEther(BigNumber.from(value));
};

const parseToWei = (value: number) => {
  if (!value) return '0.0';

  return String(value * 1000000000000000000);
};

const parseWeiToEther = (value: number) => {
  
  return (value / 1000000000000000000).toFixed(8);
};
export {
  getBalanceEther,
  requestEtherWithdrawConfirm,
  isAddress,
  parseToEther,
  parseToWei,
  parseWeiToEther
};
