import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const GameBtn = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<button ref={ref} {...props}>
				{children}
			</button>
		);
	}
);
GameBtn.displayName = 'GameBtn';

export default GameBtn;
