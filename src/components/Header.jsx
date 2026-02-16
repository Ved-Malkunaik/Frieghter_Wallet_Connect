import React, { useState } from 'react';
import { checkConnection, getBalance, retreivePublicKey, userSignTransaction } from './Freighter.jsx';
import './Header.css';

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();
      if (!allowed) return alert("Permission denied");

      const key = await retreivePublicKey();
      const bal = await getBalance();

      setPublicKey(key);
      setBalance(Number(bal).toFixed(2));
      setConnected(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="header-bar">
      <div className="header-title">Stellar dApp</div>
      <div className="header-wallet-info">
        {publicKey && (
          <>
            <div className="wallet-address">
              {`${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`}
            </div>
            <div className="wallet-balance">
              Balance: {balance} XLM
            </div>
          </>
        )}
        <button
          type="button"
          className={connected ? "wallet-btn connected" : "wallet-btn"}
          onClick={connectWallet}
          disabled={connected}
        >
          {connected ? "Connected" : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;

