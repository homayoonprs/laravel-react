import { userType } from '@/types/Models/user.type'
import { Col, Row } from 'antd'
import React, { FC } from 'react'

export interface IUserAccountsTab
{
    user: userType
}

const UserAccountsTab: FC<IUserAccountsTab> = (props) => {
    return (
        <Row>
            <Col>
            </Col>
        </Row>
    )
}

export default UserAccountsTab;

