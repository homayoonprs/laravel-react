import type { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {ConfigProvider} from 'antd'
import { ProvideAuth } from '@/services/auth/useAuth'

import '@/styles/globals.scss'
import fa_IR from 'antd/locale/fa_IR';
import {Outlet} from "react-router-dom";


const queryClient = new QueryClient();

export default function App() {
  
  return (
    <ProvideAuth>
      <QueryClientProvider client={queryClient}>

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

        {/*<ReactQueryDevtools />*/}

      </QueryClientProvider>

    </ProvideAuth>
  )
}