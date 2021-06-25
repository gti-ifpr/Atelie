import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames';

import styles from './styles.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean
};

export function Button({ isActive = false, ...props }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            {...props}
        />
    )
}