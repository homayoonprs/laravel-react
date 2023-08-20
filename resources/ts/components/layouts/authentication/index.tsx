import React from 'react'
import styles from './index.module.scss';

interface LayoutProps {
    children: React.ReactNode,
}

const Layout = (props: LayoutProps) => {
  return (
    <div  className={styles.layout_container}>
        {props.children}
    </div>
  )
}

export default Layout;