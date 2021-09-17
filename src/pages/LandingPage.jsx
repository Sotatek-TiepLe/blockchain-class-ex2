import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
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
	const [loaded, setLoaded] = useState(true);

	// Default auto connect network
	useEffect(() => {
		setLoaded(true);
		injected
			.isAuthorized()
			.then((isAuthorized) => {
				if (isAuthorized && !active && !error) {
					activate(injected);
				}
			})
			.catch(() => {})
			.finally(() => {
				setLoaded(false);
			});
	}, [activate, active, error]);

	return (
		!loaded && (
			<Container
				style={{
					maxWidth: "610px",
				}}
			>
				<Row>
					<Col>
						<h2>Connect with ...</h2>
					</Col>
				</Row>
				<Row className="justify-content-center g-4">
					<Button
						onClick={() => {
							activate(walletconnect);
						}}
					>
						WalletConnect
					</Button>
					<Button
						onClick={() => {
							activate(injected);
						}}
					>
						MetaMask
					</Button>
				</Row>
			</Container>
		)
	);
}
