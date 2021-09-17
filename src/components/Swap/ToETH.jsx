import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { parseUnits, parseEther } from "@ethersproject/units";
import ABI from "../../ABI.json";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ABI_ERC20, SMART_CONTRACT_ADDRESS } from "../../const";
import { Button, Container, Row, Col, Form, Input } from "react-bootstrap";

export default function ToETH() {
	const web3Context = useWeb3React();
	const { library, account } = web3Context;
	const [amount, setAmount] = useState("");

	const onSubmitDepositETH = async (e) => {
		//
		e.preventDefault();

		const myContract = new Contract(
			SMART_CONTRACT_ADDRESS,
			ABI_ERC20,
			library.getSigner()
		);
		const tx = await myContract.deposit({ value: parseEther(amount) });
		debugger;
		const log = await tx.wait();
		console.log(`log`, log);
		debugger;
	};
	const onSubmitTransferWETH = async (e) => {
		//
		e.preventDefault();

		const myContract = new Contract(
			SMART_CONTRACT_ADDRESS,
			ABI,
			library.getSigner()
		);
		const amountSent = parseUnits(amount);
		const tx = await myContract.transfer(
			"0x399C3A3b0fa0Cc447869Ee815475d26264D44804",
			amountSent
		);
		debugger;
		await tx.wait();
		debugger;
	};

	const onChangeAmount = (e) => {
		setAmount(e.target.value);
	};

	return (
		<div className="justify-content-center">
			<Form onSubmit={onSubmitDepositETH}>
				<Form.Group className="mb-3">
					<Form.Control
						type="text"
						className="mb-3"
						placeholder={"Input amount"}
						value={amount}
						onChange={onChangeAmount}
					/>
					<Button type="submit">Deposit ETH</Button>
				</Form.Group>
			</Form>
			{/* <form onSubmit={onSubmitTransferWETH}>
				<input
					type="text"
					placeholder={"Input amount"}
					value={amount}
					onChange={onChangeAmount}
				/>
				<Button type="submit">Transfer WETH</Button>
			</form> */}
		</div>
	);
}
