import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { ABI_ERC20, SMART_CONTRACT_ADDRESS } from "../const";
import { Contract } from "@ethersproject/contracts";
import ChainName from "../components/Chain/ChainName";
import LandingPage from "./LandingPage";
import { Container, Row, Col, Button } from "react-bootstrap";
import ToWETH from "../components/Swap/ToWETH";
import ToETH from "../components/Swap/ToETH";
import { injected } from "../connect";
import Balance from "../components/Balance/Balance";

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
	const [balanceETH, setBalanceETH] = useState(null);
	const [balanceWETH, setBalanceWETH] = useState(null);

	const getBalanceETH = () => {
		// ETH
		library
			.getBalance(account)
			.then((balance) => {
				setBalanceETH(balance);
			})
			.catch(() => {
				setBalanceETH(null);
			});

		return () => {
			setBalanceETH(undefined);
		};
	};

	const getBalanceWETH = () => {
		// Wrap ETH
		const myContract = new Contract(
			SMART_CONTRACT_ADDRESS,
			ABI_ERC20,
			library.getSigner()
		);
		(async function () {
			const balanceHex = await myContract.balanceOf(account);
			setBalanceWETH(balanceHex);
		})();
		return () => {
			setBalanceWETH(undefined);
		};
	};

	useEffect(() => {
		if (!!account && !!library) {
			getBalanceETH();
			getBalanceWETH();
		}
		return () => {
			setBalanceETH(null);
			setBalanceWETH(null);
		};
	}, [account, library, chainId]);

	// Setup init: Listen deposit, withdrawal
	useEffect(() => {
		if (library) {
			const contract = new Contract(
				SMART_CONTRACT_ADDRESS,
				ABI_ERC20,
				library.getSigner()
			);

			const toWETH = contract.filters.Deposit(account);
			contract.on(toWETH, (from, amount, event) => {
				// console.log("Deposit", { from, amount, event });
				getBalanceETH();
				getBalanceWETH();
			});

			const toETH = contract.filters.Withdrawal(account);
			contract.on(toETH, (from, amount, event) => {
				// console.log("Withdrawal", { from, amount, event });
				getBalanceETH();
				getBalanceWETH();
			});

			return () => {
				library.removeAllListeners(toETH);
				library.removeAllListeners(toWETH);
			};
		}
	}, [library]);

	return (
		<>
			{library ? (
				<Container>
					<h2>Home page</h2>
					<div>
						Account: <b>{account}</b>
						<Button
							size="sm"
							className="ms-3"
							variant="danger"
							onClick={() => {
								activate(null);
							}}
						>
							Logout
						</Button>
					</div>
					<ChainName />
					<Balance name="ETH" balance={balanceETH} />
					<Balance name="WETH" balance={balanceWETH} />
					<ToWETH />
					<ToETH />
				</Container>
			) : (
				<LandingPage />
			)}
		</>
	);
}
