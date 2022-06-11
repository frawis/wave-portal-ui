import { useEffect, useState } from "react";

type Wallet = {
  connected: boolean;
  account?: string;
};

const useWallet = () => {
  const [userInfo, setUserInfo] = useState<Wallet>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentAccount, setIsCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) {
        setIsConnected(false);
        console.log("Make sure you have metamask!");
      } else {
        setIsConnected(true);
        setUserInfo({ ...userInfo, connected: isConnected });
        console.log("We have the etherum object", ethereum);
      }
      /**
       * check if we're authorized to access the users wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setIsCurrentAccount(account);
        setUserInfo({ connected: true, account: account });
      } else {
        console.log("No authorized account found!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return userInfo;
};
export default useWallet;
