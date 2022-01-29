async function main() {
  const factory = await ethers.getContractFactory("EmailService");

  // Start deployment, returning a promise that resolves to a contract object
  const ENABLED = true;
  const EMAIL_FEE_ETH = 0.00001; 
  const contract = await factory.deploy(ENABLED, EMAIL_FEE_ETH * ethers.constants.WeiPerEther);
  console.log("Contract deployed to address:", contract.address);}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
