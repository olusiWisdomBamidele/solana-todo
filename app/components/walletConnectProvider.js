import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import{ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {GlowWallerAdapter, PhantomWalletAdapter,slopeWalletAdapter} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export const WalletConnectProvider =({children}) => {
    const network =WalletAdapterNetwork.Devnet
    const endpoint = useMemo(()=> {
        if(network === WalletAdapterNetwork.Devnet){
            return 'https://rough-maximum-lake.solana-devnet.quiknode.pro/6068ea071b94e63a1a890c20518204b4c0845858'
        }
        return clusterApiUrl(network)
    }, [network])

const wallets = useMemo(()=> [new PhantomWalletAdapter()],[network])
return(
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets= {wallets} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)
}