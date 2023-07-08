const { ethers }= require("hardhat");

async function main() {

    const Chai = await ethers.getContractFactory("chai");
    const chai = await Chai.deploy();
    await chai.waitForDeployment();
  
    console.log("Address of contract:", chai.target); 
    //Address of contract: 0x9F253e9CD0eA2B8dcb4552aaD7BBdB480E8F48e2
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  