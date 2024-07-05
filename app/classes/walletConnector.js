export default class WalletConnector {
    static connect() {
        if (isPhantomInstalled()){
            establishConnection();
        }
        else {
            console.warn('Phantom extension not installed. Please install it to continue.')
            goToPhantomInstall();
        }
    }

    static async establishConnection() {
        return await establishConnection();
    }

    static disconnect() {
        // Implementation for disconnecting from the wallet
    }
}

const isPhantomInstalled= () => {
    if ('phantom' in window) {
        const provider = window.phantom?.solana;
    
        if (provider?.isPhantom) {
          return true;
        }
      }
    
      return false;
}

const goToPhantomInstall = () => {
    window.open('https://phantom.app/', '_blank');
}


const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
  
      if (provider?.isPhantom) {
        return provider;
      }
    }
  
    window.open('https://phantom.app/', '_blank');
  };
  
const establishConnection =async () => {
    const provider = getProvider();
    try {
        const resp = await provider.connect();
        console.log(resp.publicKey.toString());

        return resp;
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
    } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
    }
}



//module.exports = WalletConnector;