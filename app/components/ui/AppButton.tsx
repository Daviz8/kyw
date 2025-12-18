/** @format */

import Link from "next/link";
import { ReactNode } from "react";

interface CustomButtonProps {
	children: ReactNode;
	className?: string;
	href?: string;
}

export function AppButton(props: CustomButtonProps) {
	const { children, className, href } = props;

	return (
		<>
			<div className={`${className} rounded-full w-full h-full`}>
				<button className="w-full h-full rounded-full">
					<Link href={`${href}`}>{children}</Link>
				</button>
			</div>
		</>
	);
}
