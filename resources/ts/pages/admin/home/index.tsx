import React, { FC, ReactElement, useEffect } from 'react'
import Layout from '@/components/layouts/adminDashboard'
import gateway from '@/services/gateway'
import {Button, Input} from 'antd'
import styles from './index.module.scss';
const Home: FC<any> = ({isAuthenticated}) => {

    return (
        <Layout>
            <h1>Home Page</h1>
        </Layout>
    )
}


export default Home;
