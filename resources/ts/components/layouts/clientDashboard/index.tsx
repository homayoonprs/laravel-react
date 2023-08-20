import React, { FC, useContext } from 'react';
import { Button, Col, Layout as ANTDLayout, Menu, MenuProps, Row } from 'antd';
import { AppstoreOutlined, DashboardOutlined, GiftOutlined, HeartOutlined, MailOutlined, PercentageOutlined, SettingOutlined, SketchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '@/services/auth/useAuth';

export interface IClientLayout
{
    children: React.ReactNode
}

const Layout: FC<IClientLayout> = ({children}) => {
  const auth = useContext(authContext)
  const navigate = useNavigate()
  const location = useLocation();

  const items: MenuProps['items'] = [
      {
        label: <Button type='primary'>خرید اشتراک</Button>,
        key: 'plan',
        onClick: () => navigate('/client/plan')
      },
      {
        label: 'اشتراک های من',
        icon: <ThunderboltOutlined />,
        key: 'account',
        onClick: () => navigate('/client/account')

      },
      {
        label: 'کد های تخفیف من',
        icon: <GiftOutlined />,
        key: 'coupon',
        onClick: () => navigate('/client/coupon')
      },
    ];

  return (
      <ANTDLayout>

          <ANTDLayout.Header className='!p-0 !bg-white'>
            <Row justify={'space-between'}>
              <Col span={24} xs={21}>
                <Menu
                  mode="horizontal"
                  items={items} 
                  defaultSelectedKeys={[location.pathname.split('/')[1]]}
                />
              </Col>
              <Col>
                <img width={40} src='' className=' ml-4 mt-3 hidden xs:block'/>
              </Col>
            </Row>
          </ANTDLayout.Header>

          <ANTDLayout>
              {children}
          </ANTDLayout>

          <ANTDLayout.Footer>
              <div className='text-center border-t'>
                تمامی حقوق برای کاورنت محفوظ است
              </div>
          </ANTDLayout.Footer>


      </ANTDLayout>
  )

}

export default Layout