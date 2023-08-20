import React, { useContext } from 'react'
import { NavbarInterface } from './NavbarInterface';
import styles from './index.module.scss';
import { useGoingUp } from '@/utils/scrollspy/useGoingUp';
import {VscBell} from 'react-icons/vsc'
import useDarkMode from '@/utils/theme/useDarkMode';
import { cs } from '@/utils/helpers';
import {authContext}  from '@/services/auth/useAuth';
import {Dropdown} from "@/components/UI/dropdown";
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const Navbar = ( props: NavbarInterface ) => {
    const {logout, user} = useContext(authContext);
    const [darkTheme, setDarkTheme] = useDarkMode();
    const goingUp = useGoingUp()

    // @ts-ignore
    const handleMode = () => setDarkTheme(!darkTheme);

    return (

        <div className={cs(styles.navbar_container, !goingUp ? styles.going_up : '')}
        >
            <div className={cs(styles.search_bar)}>
                {/*<FloatLabelInput id='general_search' type='text' icon={<MdSearch/>} label=' ' size='sm'/>*/}
            </div>

            <div className={styles.actions}>
                {/* <Dropdown label='همایون پارسایی' options={[
                    {label: 'تنظیمات حساب کاربری', onClick: () => {}},
                    {label: darkTheme ? 'تم لایت' : 'تم دارک', onClick: handleMode},
                    {label: 'خروج', onClick: logout}
                ]}/>
                <VscBell onClick={props.onClickShowNotifications} className={cs(styles.notification_icon)}/> */}
                <Button icon={<PoweroffOutlined />} onClick={logout}/>
            </div>
        </div>
    )
}

export default Navbar;
