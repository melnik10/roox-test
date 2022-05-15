import React, {FC} from 'react';
import style from './Button.module.scss'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {
    variant?: 'primary' | 'success' | 'disabled'
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement>) => void)
        | undefined;
}

const Button:FC<Props> = ({variant = 'primary', ...props}) => {
    return (
        <button {...props} onClick={props.onClick} className={style[variant]}>
            {props.children}
        </button>
    );
};

export default Button;