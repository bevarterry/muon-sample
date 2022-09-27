import '@ethersproject/shims';
import {ethers, providers} from 'ethers';
import muVaultConfig from './mu_vault_abi.json';

const predefine = {
  scan_bsc_mainnet: 'https://api.bscscan.com/',
  scan_bsc_testnet: 'https://api-testnet.bscscan.com/',
  node_host_bsc_mainnet: 'https://bsc-dataseed.binance.org/',
  node_host_bsc_testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

let provider = new ethers.providers.JsonRpcProvider(
  predefine.node_host_bsc_testnet,
);

const MU_VAULT_CONTRACT = '0x70068D8B45F04056C896C6E44A4b5E0Fb02c7d67';

const getBalanceBnb = async (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey);
  // const wallet = new ethers.Wallet(
  //   '1a619a0cc6e2c3592c641366a8b4e34c49301eebde395f4d4b634bae5fa466dd',
  // );

  const signer = wallet.connect(provider);

  let contract = new ethers.Contract(
    MU_VAULT_CONTRACT,
    muVaultConfig.abi,
    signer,
  );

  const balance = await contract.getBalance({
    from: wallet.address,
  });
  console.log('bnb', balance);
  return ethers.utils.formatEther(balance);
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

export {getBalanceBnb};
