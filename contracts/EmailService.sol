pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EmailService is Ownable {
    uint256 private emailFee = 0.00001 ether;
    bool private enabled = false;

    event NewEmail(string emailAddress, string emailBody);

    constructor(bool _enabled, uint256 _fee) {
        // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
        enabled = _enabled;
        emailFee = _fee;
    }

    function setEnabled() external onlyOwner {
        enabled = true;
    }

    function setDisabled() external onlyOwner {
        enabled = false;
    }

    function setEmailFee(uint256 _fee) external onlyOwner {
        emailFee = _fee;
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // TODO(asta): Change emailFee to public - should create a public getter automatically
    function fee() external view returns (uint256) {
        return emailFee;
    }

    function sendEmail(string memory emailAddress, string memory emailBody)
        public
        payable
    {
        require(msg.value < emailFee);
        emit NewEmail(emailAddress, emailBody);
    }
}
