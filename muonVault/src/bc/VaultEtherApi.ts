import '@ethersproject/shims';
import {BigNumber, ethers, providers} from 'ethers';
import muVaultConfig from './mu_vault_ether_abi.json';

const predefine = {
  SCAN_API_KEY: 'IXDXEM3TG5PP4AQUJZSGRF4ZKCDV6Y14CC',
  SCAN_MAINNET: 'http://api.etherscan.io/',
  SCAN_TESTNET: 'https://api-rinkeby.etherscan.io/',
  SCAN_ROPSTEN: 'https://api-ropsten.etherscan.io/',
  SCAN_RINKEBY: 'https://api-rinkeby.etherscan.io/',

  NODE_HOST_MAINNET:
    'https://mainnet.infura.io/v3/35e8ec5bb21b460bbb74bbe1ee56b2d5',
  NODE_HOST_TESTNET:
    'https://rinkeby.infura.io/v3/35e8ec5bb21b460bbb74bbe1ee56b2d5',
  NODE_HOST_ROPSTEN:
    'https://ropsten.infura.io/v3/35e8ec5bb21b460bbb74bbe1ee56b2d5',
  NODE_HOST_RINKEBY:
    'https://rinkeby.infura.io/v3/35e8ec5bb21b460bbb74bbe1ee56b2d5',
};

const gasPrice = '10';
const gasLimit = 1000000;

const provider = new providers.InfuraProvider(
  'goerli',
  '35e8ec5bb21b460bbb74bbe1ee56b2d5',
);

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

  console.log('출금요청 to', to);
  console.log('출금요청 value', value);
  console.log('출금요청 privateKey', privateKey);
  console.log('출금요청 contractAddress', contractAddress);

  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  let contract = new ethers.Contract(
    contractAddress,
    muVaultConfig.abi,
    signer,
  );

  let receipt;
  try {
    receipt = await contract.requestAndConfirmWithdraw(
      to,
      ethers.utils.parseUnits(value, 'ether'),
      {
        from: wallet.address,
        gasLimit: gasLimit,
        gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'),
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
  if(!value) return '0.0';

  return ethers.utils.formatEther(BigNumber.from(value));
}
export {getBalanceEther, requestEtherWithdrawConfirm, isAddress, parseToEther};
