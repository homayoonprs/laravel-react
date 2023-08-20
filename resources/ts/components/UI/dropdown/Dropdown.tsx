import React, { useState } from 'react'
import styles from './Dropdown.module.scss'
import { DropdownInterface, DropdownOption } from './DropdownInterface'
import {IoIosArrowDown} from 'react-icons/io'
import {Avatar} from "antd";

const Dropdown = ({label, options, image}: DropdownInterface) => {

    const toggleactive = (e: React.MouseEvent) => {
        // @ts-ignore
        e.currentTarget.classList.toggle(styles.active)
    }

    const dropdownOptions = options.map((option: DropdownOption, index: number) => (
        <div key={index} className={styles.dropdown_option} onClick={option.onClick}>
            {option.label}
        </div>
    ))

    return (
        <div className={styles.dropdown_container} onClick={toggleactive}>
            <div className={styles.dropdown_button}>
                <div className={styles.arrow}>
                    <IoIosArrowDown/>
                </div>
                <p>{label}</p>
                <div className={styles.image}>
                    <Avatar size={34}/>
                </div>
            </div>
            <div className={styles.dropdown_content}>
                {dropdownOptions}
            </div>
        </div>
    )

}

export default Dropdown;
