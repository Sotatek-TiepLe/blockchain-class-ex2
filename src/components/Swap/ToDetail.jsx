import React from "react";
import { Button } from "react-bootstrap";

export default function ToDetail({ txDetail }) {
	const onClickShowDetail = (e) => {
		window.open("https://rinkeby.etherscan.io/tx/" + txDetail.hash, "_blank");
	};

	return (
		<>
			{txDetail.hash && (
				<Button
					className="ms-3"
					variant={txDetail.done ? "success" : "primary"}
					onClick={onClickShowDetail}
				>
					Transaction Details
				</Button>
			)}
		</>
	);
}
