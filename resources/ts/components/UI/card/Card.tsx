import { ICard } from './ICard'
import styles from './Card.module.scss'
import {cs} from "@/utils/helpers";

const Card = ({children, className = ''}: ICard) => {

    return (
        <div className={cs(
            styles.card,
            className
        )}>
            {children}
        </div>
    )
}

export default Card

