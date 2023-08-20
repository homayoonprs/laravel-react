import { CalendarProps, DateObject, DatePickerProps } from "react-multi-date-picker"
import { InputFiledSize } from "../input/IInput"
import {SizeType} from "antd/es/config-provider/SizeContext";

export interface IDatepicker extends Omit<CalendarProps, 'onChange'> ,DatePickerProps
{
    inputSize?: SizeType
    onChange?: (date: DateObject | DateObject[] | null) => void
}