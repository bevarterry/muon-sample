import '@ethersproject/shims';
import {ethers, providers} from 'ethers';
import { INSUFFICIENT_FUNDS } from '~/view/constantProperties';
import muVaultConfig from './mu_vault_bnb_abi.json';
import { parseToWei } from './VaultEtherApi';

const predefine = {
  scan_bsc_mainnet: 'https://api.bscscan.com/',
  scan_bsc_testnet: 'https://api-testnet.bscscan.com/',
  node_host_bsc_mainnet: 'https://bsc-dataseed.binance.org/',
  node_host_bsc_testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

const baseGasLimit = 21000;

let provider = new ethers.providers.JsonRpcProvider(
  predefine.node_host_bsc_testnet,
);

const MU_VAULT_CONTRACT = '0x70068D8B45F04056C896C6E44A4b5E0Fb02c7d67';

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

  console.log(baseGasLimit + gasLimit._hex);
  console.log('출금요청 to', to);
  console.log('출금요청 value', value);
  console.log('출금요청 privateKey', privateKey);
  console.log('출금요청 contractAddress', contractAddress);
  console.log('출금요청 gasPriceNumber', gasPriceNumber);
  console.log(
    '출금요청 gasLimit',
    gasLimitNumber,
  );
  
  console.log('이더리잔액', parseInt(etherBalance._hex, 16));
  console.log('필요한가스', Number(gasLimitNumber*Number(gasPriceNumber)));
  console.log('전송할이더', parseToWei(Number(value)));
  console.log('필요한총액', Number(gasLimitNumber*Number(gasPriceNumber)) + Number(parseToWei(Number(value))));
  console.log('출금요청 nonce', nonce);
  if(Number(parseInt(etherBalance._hex, 16)) <  Number(gasLimitNumber*Number(gasPriceNumber)) + Number(parseToWei(Number(value)))){
    return INSUFFICIENT_FUNDS;
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


export {getBalanceBnb, requestBnbWithdrawConfirm};
