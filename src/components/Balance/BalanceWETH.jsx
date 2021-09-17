import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import ABI from "./../../ABI.json";
import { Contract } from "@ethersproject/contracts";
import Balance from "./Balance";
import { formatAmount } from "../../utils";

export default function BalanceWETH() {
	const { account, library, chainId, connector } = useWeb3React();
	const [balance, setBalance] = useState();
	const SMART_CONTRACT_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

	useEffect(() => {
		if (!!account && !!library) {
			const myContract = new Contract(
				SMART_CONTRACT_ADDRESS,
				ABI,
				library.getSigner()
			);
			(async function () {
				console.log(`Address Smart Contract: `, myContract, account);
				const balanceHex = await myContract.balanceOf(account);
				setBalance(balanceHex);
				console.log(`object`, balanceHex, BigNumber);
				// BigNumber.set({ DECIMAL_PLACES: 5 })
				const bigNumber = BigNumber.from(balanceHex._hex);
				const balanceWETH = bigNumber;
				console.log(`balanceWETH`, balanceWETH.toString());
			})();
			return () => {
				setBalance(undefined);
			};
		}
	}, [account, library, chainId, connector]); // ensures refresh if referential identity of library doesn't change across chainIds

	return (
		<Balance
			name={"WETH"}
			balance={balance ? formatAmount.format(formatEther(balance)) : ""}
		/>
	);
}
