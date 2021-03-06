import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import Home from "./pages/Home";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	return library; // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Home />
		</Web3ReactProvider>
	);
}

export default App;