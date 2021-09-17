import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { ABI_ERC20, SMART_CONTRACT_ADDRESS } from "../../const";
import { Card, Col, Row, Form, Input, Button } from "react-bootstrap";
import ToDetail from "./ToDetail";

export default function ToETH() {
	const web3Context = useWeb3React();
	const { library, account } = web3Context;
	const [amount, setAmount] = useState("");
	const [txDetail, setTxDetail] = useState({
		hash: null,
		done: false,
	});

	const onSubmitWithdrawWETH = async (e) => {
		e.preventDefault();

		const myContract = new Contract(
			SMART_CONTRACT_ADDRESS,
			ABI_ERC20,
			library.getSigner()
		);
		const amountSent = String(Number(amount) * 10 ** 18);
		// Sent
		const tx = await myContract.withdraw(amountSent);
		setTxDetail({ ...txDetail, hash: tx.hash, done: false });

		// response
		const logs = await tx.wait();
		setTxDetail((preV) => ({ ...preV, done: logs.status === 1 }));
	};

	const onChangeAmount = (e) => {
		setAmount(e.target.value);
	};

	return (
		<Card className="mt-3">
			<Card.Header>Withdraw WETH</Card.Header>
			<Card.Body>
				<Form onSubmit={onSubmitWithdrawWETH}>
					<Form.Group className="mb-3">
						<Form.Control
							type="number"
							min="0"
							step="0.0000000000001"
							className="mb-3"
							placeholder={"Input amount"}
							value={amount}
							onChange={onChangeAmount}
						/>
						<Button type="submit">Unwrap</Button>
						<ToDetail txDetail={txDetail} />
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	);
}
