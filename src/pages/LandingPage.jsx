import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { walletconnect, injected } from "../connect";

export default function LandingPage() {
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

	// Default auto connect network
	useEffect(() => {
		injected
			.isAuthorized()
			.then((isAuthorized) => {
				// setLoaded(true)
				if (isAuthorized && !active && !error) {
					activate(injected);
				}
			})
			.catch(() => {
				// setLoaded(true)
			});
	}, [activate, active, error]);

	// Subscribe to accounts change
	library &&
		library.on("accountsChanged", (accounts) => {
			console.log(accounts);
		});

	// Subscribe to chainId change
	library &&
		library.on("connect", (chainId) => {
			console.log(chainId);
		});

	// Subscribe to session disconnection
	library &&
		library.on("disconnect", (code, reason) => {
			console.log(code, reason);
		});

	return (
		<Container>
			<Row>
				<h2>Connect with ...</h2>
			</Row>
			<Row className="text-center">
				<Col>
					<Button
						onClick={() => {
							activate(walletconnect);
						}}
					>
						WalletConnect
					</Button>
				</Col>
				<Col>
					<Button
						onClick={() => {
							activate(injected);
						}}
					>
						MetaMask
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
