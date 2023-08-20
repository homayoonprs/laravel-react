import { MdOutlineFilterAlt } from "react-icons/md"
import {Button} from '../button'

const Filter = () => {
    return (
        <Button onClick={e => console.log(true)} buttonStyle='light-secondary' outline size='sm'>
              <MdOutlineFilterAlt />
              &nbsp;
              فیلتر
          </Button>
    )
}

export default Filter