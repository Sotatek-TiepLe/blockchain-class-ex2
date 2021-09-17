import { useWeb3React } from "@web3-react/core";
import React from "react";
import { CHAIN_LIST } from "../../const";

export default function ChainName() {
	const { chainId } = useWeb3React();
	return (
		<div>
			Network : <b>{chainId ? CHAIN_LIST[chainId] : ""}</b>
		</div>
	);
}
