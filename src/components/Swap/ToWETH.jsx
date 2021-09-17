import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { ABI_ERC20, SMART_CONTRACT_ADDRESS } from "../../const";
import { Container, Col, Row, Form, Input, Button } from "react-bootstrap";

export default function ToWETH() {
	const web3Context = useWeb3React();
	const { library, account } = web3Context;
	const [amount, setAmount] = useState("");

	const onSubmitWithoutWETH = async (e) => {
		e.preventDefault();

		const myContract = new Contract(
			SMART_CONTRACT_ADDRESS,
			ABI_ERC20,
			library.getSigner()
		);
		const amountSent = String(Number(amount) * 10 ** 18);
		const tx = await myContract.withdraw(amountSent);
		debugger;
		await tx.wait();
		debugger;
	};

	const onChangeAmount = (e) => {
		setAmount(e.target.value);
	};

	return (
		<div>
			<Form onSubmit={onSubmitWithoutWETH}>
				<Form.Group className="mb-3">
					<Form.Control
						type="text"
						className="mb-3"
						placeholder={"Input amount"}
						value={amount}
						onChange={onChangeAmount}
					/>
					<Button type="submit">Without WETH</Button>
				</Form.Group>
			</Form>
		</div>
	);
}
