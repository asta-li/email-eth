# On-chain / off-chain email service

Send an email via smart contract.

The email service consists of an on-chain and off-chain component:
a smart contract that receives on-chain requests for emails and emits email events, and an off-chain
component that listens to and processes emitted events.
Note that emails and messages should be encrypted.

![screenshot](https://github.com/asta-li/email-eth/blob/main/screenshot.png?raw=true)

Under development.

## Deploy the service

Deploy the contract on chain:

```
npx hardhat compile
npx hardhat run scripts/deploy.js --network ropsten
```

Run the email server:

```
npx hardhat run server/emailServer.js --network ropsten
```

## Interact with the email service

Run the tester script.

```
npx hardhat run scripts/interact.js --network ropsten
```

Run the stand-alone frontend:

```
npm start
```

Smart contract "client" example:

```
contracts/ExampleEmailer.sol
```
