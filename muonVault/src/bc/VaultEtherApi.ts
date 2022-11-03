import {BigNumber, ethers, providers} from 'ethers';
import {INSUFFICIENT_FUNDS} from '~/view/constantProperties';
import muVaultConfig from './mu_vault_ether_abi.json';
import '../../shim';
const Web3 = require('web3');
const web3 = new Web3(
  'https://goerli.infura.io/v3/35e8ec5bb21b460bbb74bbe1ee56b2d5',
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
  const contract = new web3.eth.Contract(muVaultConfig.abi, contractAddress);
  const valueToWei = web3.utils.toWei(value, 'ether');

  const gasPrice = await getGasPrice();
  const gasLimit = await getEstimateGasLimit(account.address, to, valueToWei);
  console.log('출금요청 to', to);
  console.log('출금요청 from', account.address);
  console.log('출금요청 value', valueToWei);
  console.log('출금요청 privateKey', privateKey);
  console.log('출금요청 contractAddress', contractAddress);
  console.log('출금요청 gasPrice', gasPrice);
  console.log('출금요청 gasLimit', gasLimit);
  console.log('출금요청 contract method', contract.methods);
  // console.log('필요한가스', Number(gasLimitNumber*Number(gasPriceNumber)));
  // console.log('출금요청 gasPriceNumber', gasPriceNumber);
  // console.log('이더리잔액', parseInt(etherBalance._hex, 16));
  // console.log('필요한가스', Number(gasLimitNumber*Number(gasPriceNumber)));
  // console.log('전송할이더', parseToWei(Number(value)));
  // console.log('필요한총액', totalNeedValue);
  // console.log('출금요청 nonce', nonce);
  const receipt = await contract.methods.requestAndConfirmWithdraw(
    to,
    valueToWei,
  );

  const result = await receipt.send({
    from: account.address,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
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
