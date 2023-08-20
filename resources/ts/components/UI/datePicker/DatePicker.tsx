import React from 'react'

import MultiDatePicker, { DateObject} from 'react-multi-date-picker'
import persian_fa from 'react-date-object/locales/persian_fa'
import persianCalender from 'react-date-object/calendars/persian'

// @ts-ignore
import transition from "react-element-popper/animations/transition"
// @ts-ignore
import opacity from "react-element-popper/animations/opacity"

import { InputField } from '../input';
import { IDatepicker } from './IDatepicker';
import { cs } from '@/utils/helpers';

import './DatePicker.module.scss'

import { Input } from 'antd'

const DatePicker = (props: IDatepicker) => {

    const handleChange = (selectedDates: DateObject | DateObject[] | null): void => {
        props.onChange && props.onChange(selectedDates)
    }

    return (
        <>
            <MultiDatePicker
                {...props}
                render={(value: any, openCalendar: any) => {
                    return (
                        <Input
                            value={value}
                            onClick={openCalendar}
                            size={props.inputSize}
                            type='text'
                        />
                    )
                }} 
                value={props.value?.toString()}
                onChange={handleChange}
                placeholder={props.placeholder}
                animations={[transition(), opacity()]}
                containerClassName={`w-full ${props.containerClassName}`}
                locale={props.locale ? props.locale : persian_fa} 
                calendar={props.calendar ? props.calendar : persianCalender}
            />
        </>
    )
}

export default DatePicker;