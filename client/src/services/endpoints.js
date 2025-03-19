const ENDPOINTS = {
    WALLET: {
      CREATE: "/api/create-wallet",
      IMPORT_PRIVATE_KEY: "/api/import-wallet/private-key",
      IMPORT_MNEMONIC: "/api/import-wallet/mnemonic",
      GET_BALANCE: (address) => `/api/balance/${address}`,
      GET_WALLET: (address) => `/api/wallet/${address}`,
    },
    TRANSACTION: {
      SEND: "/api/transaction/send",
      HISTORY: (address) => `/api/transaction/history/${address}`,
    },
  };
  
  export default ENDPOINTS;
  