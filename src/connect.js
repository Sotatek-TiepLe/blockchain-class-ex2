import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })


export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: "https://mainnet.infura.io/v3/c9f9eba874a24d339db4c886f6964321",
		4: "https://rinkeby.infura.io/v3/c9f9eba874a24d339db4c886f6964321"
	},
	qrcode: true
})
