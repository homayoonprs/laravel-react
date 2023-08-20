import React, { useRef } from 'react';
import styles from './Button.module.scss';
import { IButton } from './IButton';
import {motion} from 'framer-motion'
import Spinner from '@/components/UI/spinner';
import { cs } from '@/utils/helpers';
const Button = ({className = '', ...props}: IButton ) => {

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        const rect = e.currentTarget.getBoundingClientRect();

        let xCoords = e.clientX - rect.left;
        let yCoords = e.clientY - rect.top;

        const rippleElement = document.createElement('span')
        rippleElement.classList.add('ripple');
        rippleElement.style.left = `${xCoords}px`
        rippleElement.style.top = `${yCoords}px`
        buttonRef?.current?.append(rippleElement)

        setTimeout(() => {
            rippleElement.remove()
        },800)

        props.onClick && props.onClick(e);
    }

    const variants = {
        show: { opacity: 1, x: 0 , width: 'auto'},
        hidden: { opacity: 0, x: -10 , width: 0 },
    }

    return (
        <button
            {...props}
            ref={buttonRef}
            onClick={handleButtonClick}
            disabled={props.disabled || props.loading}
            className={cs(
                styles['btn'],
                !!props.block ? styles['button-block'] : '',
                !!props.outline ? styles['outline'] : '',
                !!props.size ? styles[`${props.size}`] : '',
                !!props.buttonStyle ? styles[`${props.buttonStyle}`] : '',
                !!props.rounded ? styles['btn-rounded'] : '',
                !!props.justIcon ? styles['just-icon'] : '',
                !!props.withBgOpacity ? styles['with-bg-opacity'] : '',
                !!props.actionBtn ? styles.action_btn : '',
                props.loading ? styles[`${props.loading}`] : '',
                className
            )}
        >
            <motion.span className='flex' variants={variants} transition={{ duration: .25 }} animate={props.loading ? 'hidden' : 'show'}>{props.children}</motion.span>
            <motion.span className='flex' initial="hidden" variants={variants} transition={{ duration: .25 }} animate={!props.loading ? 'hidden' : 'show'}><Spinner/></motion.span>
        </button>
    )
}
export default Button;