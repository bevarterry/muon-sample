import '@ethersproject/shims';
import {BigNumber, ethers, providers} from 'ethers';
import muVaultConfig from './mu_vault_ether_abi.json';




const provider = new providers.InfuraProvider(
  'goerli',
  '35e8ec5bb21b460bbb74bbe1ee56b2d5',
);

const gasLimit = 21000;

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

  let contract = new ethers.Contract(
    contractAddress,
    muVaultConfig.abi,
    signer,
  );

  const gasPrice = await provider.getGasPrice()
  const gasLimit = await contract.estimateGas.requestAndConfirmWithdraw(to, ethers.utils.parseUnits(value, 'ether'));


  console.log('출금요청 to', to);
  console.log('출금요청 value', value);
  console.log('출금요청 privateKey', privateKey);
  console.log('출금요청 contractAddress', contractAddress);
  console.log('출금요청 gasPrice', ethers.utils.parseUnits(String(gasPrice), 'wei'));
  console.log('출금요청 gasLimit', gasLimit);
  

  let receipt;
  try {
    receipt = await contract.requestAndConfirmWithdraw(
      to,
      ethers.utils.parseUnits(value, 'ether'),
      {
        from: wallet.address,
        gasLimit: gasLimit,
        gasPrice: ethers.utils.parseUnits(String(gasPrice), 'wei'),
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

const parseToWei = (value: number) => {
  if(!value) return '0.0';
  
  return String(value * 1000000000000000000);
}
export {getBalanceEther, requestEtherWithdrawConfirm, isAddress, parseToEther, parseToWei};
