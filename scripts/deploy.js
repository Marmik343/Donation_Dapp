const { ethers }= require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

async function getBalances(address){
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
      console.log(`Address ${counter} balance:`,await getBalances(address));
      counter++;
  }
}

  async function consoleMemo(memos){
    for(const memo of memos){
      const timestamp = memo.timestamp;
      const name = memo.name;
      const from = memo.from;
      const message = memo.message;
      console.log(`At ${timestamp}, name ${name}, address ${from}, message ${message}`);
    }
  }

async function main() {

  const [owner, from1, from2, from3] = await ethers.getSigners();

  const Chai = await ethers.getContractFactory("chai");
  const chai = await Chai.deploy();
  await chai.waitForDeployment();

  console.log("Address of contract:", chai.target);  

  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before buying chai");
  await consoleBalances(addresses);

  const amount = {value:ethers.parseEther("1")}
  await chai.connect(from1).buyChai("from1","ABCD",amount);
  await chai.connect(from2).buyChai("from2","ABCdaD",amount);
  await chai.connect(from3).buyChai("from3","AaadBCD",amount);

  console.log("After buying chai");
  await consoleBalances(addresses);

  const memos = await chai.getMemos();
  await consoleMemo(memos);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
