import React from 'react';
import {Card, Col, Row, Skeleton} from "antd"

const RoleCardSkeleton = () => {
    return (
        <Card>
            <Row gutter={[16,0]}>
                <Col span={16}>
                    <Skeleton.Input size="small"  />
                </Col>
                <Col span={4}>
                    <Skeleton.Avatar active size="small" shape="square"/>
                </Col>
                <Col span={4}>
                    <Skeleton.Avatar active size="small" shape="square"/>
                </Col>
            </Row>
        </Card>
    )
}

export default RoleCardSkeleton;