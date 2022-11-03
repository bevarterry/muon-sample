import '@ethersproject/shims';
import {ethers, providers} from 'ethers';
import {INSUFFICIENT_FUNDS} from '~/view/constantProperties';
import muVaultConfig from './mu_vault_bnb_abi.json';
import {parseToWei, parseWeiToEther} from './VaultEtherApi';
const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
const predefine = {
  scan_bsc_mainnet: 'https://api.bscscan.com/',
  scan_bsc_testnet: 'https://api-testnet.bscscan.com/',
  node_host_bsc_mainnet: 'https://bsc-dataseed.binance.org/',
  node_host_bsc_testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

let provider = new ethers.providers.JsonRpcProvider(
  predefine.node_host_bsc_testnet,
);

const baseGasLimit = web3.utils.toHex(1000000);

const getBalanceBnb = async (privateKey: string, contractAddress: string) => {
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

const requestBnbWithdrawConfirm = async (
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
  console.log('비앤비잔액', parseInt(realBalance._hex, 16));
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
const getEstimateGasLimit = async (from: string, to: string, value: string) => {
  const gasAmount = await web3.eth.estimateGas({to, from, value});
  return web3.utils.toHex(
    web3.utils.hexToNumber(gasAmount) + web3.utils.hexToNumber(baseGasLimit),
  );
};
const getGasPrice = async () => {
  return web3.utils.toHex(await web3.eth.getGasPrice());
};

export {getBalanceBnb, requestBnbWithdrawConfirm};
