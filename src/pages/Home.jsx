import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import BalanceETH from "../components/Balance/BalanceETH";
import BalanceWETH from "../components/Balance/BalanceWETH";
import { ABI_ERC20, SMART_CONTRACT_ADDRESS } from "../const";
import { Contract } from "@ethersproject/contracts";
import ChainName from "../components/Chain/ChainName";
import LandingPage from "./LandingPage";
import { Container, Row, Col } from "react-bootstrap";
import ToWETH from "../components/Swap/ToWETH";
import ToETH from "../components/Swap/ToETH";

export default function Home() {
	const web3ReactContext = useWeb3React();
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error,
	} = web3ReactContext;

	const [activatingConnector, setActivatingConnector] = useState();

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	useEffect(() => {
		// listen for changes on an Ethereum address
		if (library) {
			// library.on("block", () => {
			// 	console.log("update balance...");
			// });

			console.log(`listening for Transfer...`);
			const contract = new Contract(
				SMART_CONTRACT_ADDRESS,
				ABI_ERC20,
				library.getSigner()
			);
			const fromMe = contract.filters.Transfer(account, null);
			library.on(fromMe, (from, to, amount, event) => {
				console.log("Transfer|sent", { from, to, amount, event });
			});
			const toMe = contract.filters.Transfer(null, account);
			library.on(toMe, (from, to, amount, event) => {
				console.log("Transfer|received", { from, to, amount, event });
			});

			const toWETH = contract.filters.Deposit(
				"0xC5FEdBD978E30862957637f32C53E92184E40835"
			);
			contract.on(toWETH, (from, amount, event) => {
				console.log("Deposit", { from, amount, event });
			});

			const toETH = contract.filters.Withdrawal(
				"0xC5FEdBD978E30862957637f32C53E92184E40835"
			);
			contract.on(toETH, (from, amount, event) => {
				console.log("Withdrawal", { from, amount, event });
			});

			// remove listener when the component is unmounted
			return () => {
				library.removeAllListeners(toMe);
				library.removeAllListeners(fromMe);
			};
		}
		// trigger the effect only on component mount
	}, [library]);

	if (!web3ReactContext.active && !web3ReactContext.error) {
		// loading
		console.log(`loading: `, web3ReactContext);
	} else if (web3ReactContext.error) {
		//error
		console.log(`error: `, web3ReactContext);
	} else {
		// success
		console.log(`success: `, web3ReactContext);
	}

	return (
		<>
			{library ? (
				<Container>
					<h1>Home page</h1>
					<div>Account: {account}</div>
					<ChainName />
					<BalanceETH />
					<BalanceWETH />
					<ToWETH />
					<ToETH />
				</Container>
			) : (
				<LandingPage />
			)}
		</>
	);
}
