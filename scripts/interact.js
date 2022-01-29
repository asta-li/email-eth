const crypto = require('crypto');

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contractInterface = require("../artifacts/contracts/EmailService.sol/EmailService.json");
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractInterface.abi, signer);

async function main() {
  const fee = await contract.fee();
  console.log(fee);

  const result = await contract.sendEmail("", "I like NFTs.");
  console.log(result);
}
main();

function encrypt(plaintext) {
  const secretIv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_SECRET, initVector);
  let encryptedData = cipher.update(plaintext, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}