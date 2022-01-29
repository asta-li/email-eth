pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface EmailInterface {
    function fee() external view returns (uint256);

    function sendEmail(string memory emailAddress, string memory emailBody)
        external
        payable;
}

contract ExampleContract is Ownable {
    address emailContractAddress = 0xA221c8dF14434e700fD3af96a96b7a3B66beCAed;
    EmailInterface emailContract = EmailInterface(emailContractAddress);

    function setEmailContractAddress(address _address) external onlyOwner {
        emailContract = EmailInterface(_address);
    }

    function sendEmail() public payable {
        emailContract.sendEmail{gas: 80000, value: emailContract.fee()}(
            "asta@privy.io",
            "Hello World!"
        );
    }
}
