import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { formatEther } from "@ethersproject/units";
import Balance from "./Balance";
import { formatAmount } from "../../utils";

export default function BalanceETH() {
	const { account, library, chainId } = useWeb3React();
	const [balance, setBalance] = React.useState();

	useEffect(() => {
		if (!!account && !!library) {
			let stale = false;

			library
				.getBalance(account)
				.then((balance) => {
					if (!stale) {
						setBalance(balance);
					}
				})
				.catch(() => {
					if (!stale) {
						setBalance(null);
					}
				});

			return () => {
				stale = true;
				setBalance(undefined);
			};
		}
	}, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

	return (
		<Balance
			name={"ETH"}
			balance={balance ? formatAmount.format(formatEther(balance)) : ""}
		/>
	);
}
