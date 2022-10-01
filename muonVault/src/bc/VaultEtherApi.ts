import '@ethersproject/shims';
import {ethers, providers} from 'ethers';
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
  'rinkeby',
  '35e8ec5bb21b460bbb74bbe1ee56b2d5',
);

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

const requestWithdrawExceptionHandling = async (
  from: string,
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

  let receipt;
  try {
    receipt = await contract.requestWithdraw({
      from: from,
      to: to,
      value: ethers.utils.parseUnits(value, 'gwei'),
      gasLimit: gasLimit,
      gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'),
    });
    console.log(JSON.stringify(receipt));
  } catch (err) {
    console.error(JSON.stringify(err));
  }
  return receipt;
};

// astore
// import MU_VAULT_ABI from './mu_vault_abi.json';
// const MU_VAULT_CONTRACT = '0x70068D8B45F04056C896C6E44A4b5E0Fb02c7d67';

// const infuraToken = '35e8ec5bb21b460bbb74bbe1ee56b2d5';
// const provider = new providers.InfuraProvider("rinkeby", infuraToken)
// const GAS_LIMIT = 1000000;
// const GAS_PRICE = '100';

// const getBalance = async (address: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         provider.getBalance(address)
//         .then((balance) => {
//             // convert a currency unit from wei to ether
//             const balanceInEth = ethers.utils.formatEther(balance)
//             resolve(Number(balanceInEth).toFixed(8));
//         })
//         .catch((err)=>{
//             reject();
//         })

//     });
// }
// // 민팅
// const mint = async (privateKey: string, value: string) => {
//     const wallet = new ethers.Wallet(privateKey);
//     const signer = wallet.connect(provider);

//     let contract = new ethers.Contract(avocado_contract, avocado_abi, signer);
//     const tx = await contract.mintUser({
//         from: wallet.address,
//         value: ethers.utils.parseUnits(value, 'gwei'),
//         gasLimit: GAS_LIMIT,
//         gasPrice: ethers.utils.parseUnits(GAS_PRICE, 'gwei')
//     });

//     return tx;
// };

// // approved 상태 확인
// const isApprovedForAll = async (privateKey: string) => {
//     const wallet = new ethers.Wallet(privateKey);
//     const signer = wallet.connect(provider);
//     let contract = new ethers.Contract(avocado_contract, avocado_abi, signer);

//     const isApproved = await contract.isApprovedForAll(wallet.address, avocado_astore_contract, {
//         from: wallet.address
//     });

//     return isApproved;
//   };

//   const setApprovalForAll = async (privateKey: string) => {
//     const wallet = new ethers.Wallet(privateKey);
//     const signer = wallet.connect(provider);
//     let contract = new ethers.Contract(avocado_contract, avocado_abi, signer);

//     const receipt = await contract.setApprovalForAll(avocado_astore_contract, true, {
//         from: wallet.address,
//         gasLimit: GAS_LIMIT,
//         gasPrice: ethers.utils.parseUnits(GAS_PRICE, 'gwei')
//     });
//     return receipt;
//   };

// // 판매 등록
// const registerSale = async (privateKey: string, address: string, id: number, price: string) => {
//     const wallet = new ethers.Wallet(privateKey);
//     const signer = wallet.connect(provider);

//     let contract = new ethers.Contract(avocado_astore_contract, avocado_astore_abi, signer);

//     const tx = await contract.registerSale(address, id, ethers.utils.parseUnits(price, 'gwei'), {
//         from: wallet.address,
//         gasLimit: GAS_LIMIT,
//         gasPrice: ethers.utils.parseUnits(GAS_PRICE, 'gwei')
//     });

//     return tx;
// };

// // 구매
// const purchase = async (privateKey: string, value: string, id: number) => {

//     const wallet = new ethers.Wallet(privateKey);
//     const signer = wallet.connect(provider);

//     let contract = new ethers.Contract(avocado_astore_contract, avocado_astore_abi, signer);
//     console.log(ethers.utils.parseUnits(value, 'wei'));

//     const tx = await contract.purchase(avocado_contract, id, {
//         from: wallet.address,
//         value: ethers.utils.parseUnits(value, 'wei'),
//         gasLimit: GAS_LIMIT,
//         gasPrice: ethers.utils.parseUnits(GAS_PRICE, 'gwei')
//     });

//     return tx;
// };

// // 합성
// const combine = async (privateKey: string, id1: string, id2: string) => {
//     const wallet = new ethers.Wallet(privateKey);
//     const signer = wallet.connect(provider);

//     let contract = new ethers.Contract(avocado_contract, avocado_abi, signer);
//     const tx = await contract.combine(id1, id2, {
//         from: wallet.address,
//         gasLimit: GAS_LIMIT,
//         gasPrice: ethers.utils.parseUnits(GAS_PRICE, 'gwei')
//     });

//     return tx;
// };

// const parseToEther = (value: string) => {
//     if(value === '') return '0.0';
//     return ethers.utils.formatEther(ethers.utils.parseUnits(value, 'gwei'));
// }

// const parseToGwei = (value: string) => {
//     if(value === '') return '0.0';
//     return ethers.utils.formatUnits(value, 'gwei');
// }

// const parseWeiToEther = (value: string) => {
//     if(value === '') return '0.0';
//     return ethers.utils.formatEther(ethers.utils.parseUnits(value, 'gwei'));
// }

// const parseToMicroEther = (value: string) => {
//     if(value === '') return '0.0';
//     return ethers.utils.formatEther(value);
// }

export {getBalanceEther};
