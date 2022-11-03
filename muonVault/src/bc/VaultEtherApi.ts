import {BigNumber, ethers, providers} from 'ethers';
import {INSUFFICIENT_FUNDS} from '~/view/constantProperties';
import muVaultConfig from './mu_vault_ether_abi.json';

const Web3 = require('web3');
const web3 = new Web3(
  'https://goerli.infura.io/v3/35e8ec5bb21b460bbb74bbe1ee56b2d5',
);

const provider = new providers.InfuraProvider(
  'goerli',
  '35e8ec5bb21b460bbb74bbe1ee56b2d5',
);

const baseGasLimit = web3.utils.toHex(1000000);
const isAddress = (address: string) => {
  return ethers.utils.isAddress(address);
};
const getBalanceEther = async (privateKey: string, contractAddress: string) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const contract = new web3.eth.Contract(muVaultConfig.abi, contractAddress);
  let receipt = await contract.methods.getBalance().call({
    from: account.address,
  });
  return ethers.utils.formatEther(receipt);
};
const requestEtherWithdrawConfirm = async (
  to: string,
  value: string,
  privateKey: string,
  contractAddress: string,
) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(privateKey);
  const realBalance = await provider.getBalance(account.address);
  const contract = new web3.eth.Contract(muVaultConfig.abi, contractAddress);
  const valueToWei = web3.utils.toWei(value, 'ether');

  const gasPriceHex = await getGasPrice();
  const gasLimitHex = await getEstimateGasLimit(
    account.address,
    to,
    valueToWei,
  );
  const needTxFee =
    web3.utils.hexToNumber(gasLimitHex) * web3.utils.hexToNumber(gasPriceHex);

  web3.utils.hexToNumber;
  console.log('출금요청 to', to);
  console.log('출금요청 from', account.address);
  console.log('출금요청 value', valueToWei);
  console.log('출금요청 privateKey', privateKey);
  console.log('출금요청 contractAddress', contractAddress);
  console.log('출금요청 gasPrice', gasPriceHex);
  console.log('출금요청 gasLimit', gasLimitHex);
  console.log('이더리잔액', parseInt(realBalance._hex, 16));
  console.log('필요한가스', needTxFee);

  if (Number(parseInt(realBalance._hex, 16)) < needTxFee) {
    return INSUFFICIENT_FUNDS + ',' + parseWeiToEther(needTxFee);
  }

  const receipt = await contract.methods.requestAndConfirmWithdraw(
    to,
    valueToWei,
  );

  const result = await receipt.send({
    from: account.address,
    gasLimit: gasLimitHex,
    gasPrice: gasPriceHex,
  });
  console.log('result ::::::', result);
  console.log('[ BC 전송 트랜잭션] ', result.transactionHash);
  return result.transactionHash;
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
const getEstimateGasLimit = async (from: string, to: string, value: string) => {
  const gasAmount = await web3.eth.estimateGas({to, from, value});
  return web3.utils.toHex(
    web3.utils.hexToNumber(gasAmount) + web3.utils.hexToNumber(baseGasLimit),
  );
};
const getGasPrice = async () => {
  return web3.utils.toHex(await web3.eth.getGasPrice());
};
export {
  getBalanceEther,
  requestEtherWithdrawConfirm,
  isAddress,
  parseToEther,
  parseToWei,
  parseWeiToEther,
};
