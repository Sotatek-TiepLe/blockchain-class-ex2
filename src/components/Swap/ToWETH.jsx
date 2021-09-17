import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { parseUnits, parseEther } from "@ethersproject/units";
import ABI from "../../ABI.json";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ABI_ERC20, SMART_CONTRACT_ADDRESS } from "../../const";
import { Button, Card, Row, Col, Form, Input } from "react-bootstrap";
import ToDetail from "./ToDetail";

export default function ToWETH() {
	const web3Context = useWeb3React();
	const { library, account } = web3Context;
	const [amount, setAmount] = useState("");
	const [txDetail, setTxDetail] = useState({
		hash: null,
		done: false,
	});

	const onSubmitDepositETH = async (e) => {
		//
		e.preventDefault();

		const myContract = new Contract(
			SMART_CONTRACT_ADDRESS,
			ABI_ERC20,
			library.getSigner()
		);
		// Sent
		const tx = await myContract.deposit({ value: parseEther(amount) });
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
			<Card.Header>Deposit ETH</Card.Header>
			<Card.Body>
				<Form onSubmit={onSubmitDepositETH}>
					<Form.Group className="mb-3">
						<Form.Control
							type="number"
							min="0"
							step="0.0000000000001"
							max={amount}
							className="mb-3"
							placeholder={"Input amount"}
							value={amount}
							onChange={onChangeAmount}
						/>
						<Button type="submit">Wrap</Button>
						<ToDetail txDetail={txDetail} />
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	);
}
