import { formatEther } from "@ethersproject/units";
import React from "react";
import { formatAmount } from "../../utils";

export default function Balance({ name, balance }) {
	const balanceRender =
		balance === null ? "..." : formatAmount.format(formatEther(balance));
	return (
		<div>
			{name} balance : <b>{balanceRender}</b> {name}
		</div>
	);
}
