require("dotenv").config()
const HDWalletProvider = require("@truffle/hdwallet-provider")



module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(process.env.PHRASE, 
                             process.env.INFURA)
      },
      network_id: 3,
      gas: 4700000
    }
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.7.0",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}