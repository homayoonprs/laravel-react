import type { ReactElement, ReactNode } from 'react'
import {ConfigProvider} from 'antd'

import '@/styles/globals.scss'
import fa_IR from 'antd/locale/fa_IR';
import {Outlet} from "react-router-dom";

export default function App() {
  
  return (
    <ConfigProvider
        theme={{
            token: {
                fontSize: 12,
                fontFamily: 'iranSans',
            },
        }}
        locale={fa_IR}
        direction='rtl'
    >
        <Outlet />
    </ConfigProvider>
  )
}