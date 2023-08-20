import React, { FC, useEffect, useState } from 'react'
import Layout from '@/components/layouts/clientDashboard';
import gateway from '@/services/gateway';
import { couponType } from '@/types/Models/coupon.type';
import { IPaginationMeta } from '@/types/IPaginationMeta';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Typography, Pagination as ANTDPagination, Statistic, Input } from 'antd';

const Coupon: FC = () => {
    const [fetchLoading, setFetchLoading] = useState<boolean>(false)
    const [coupons, setCoupons] = useState<couponType[]|[]>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setFetchLoading(true)
        gateway.clientGetCoupons(page).then(res => {
            let {data, links, meta} = res;
            setCoupons(data);
            setPaginationMeta({links, meta});
            
        }).finally(() => setFetchLoading(false))
    },[page])

    const renderCouponCard = () => {
        return coupons.map((coupon, index) => {
            return (
                <Card key={index} className='shadow' size='small'>
                    <Row gutter={[0,16]}>
                        <Col span={24}>
                            <h3>{coupon.title}</h3>
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={4} className='font-bold m-0 p-0' copyable>{coupon.code}</Typography.Title>
                        </Col>
                        <Col>
                            <Typography.Text>{coupon.description}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text className='font-bold'>قابل استفاده تا {coupon.remaining_days} روز دیگر</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text className='font-bold'>قابل استفاده تا {coupon.max_usage} بار</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text className='font-bold'>حد اقل سقف خرید <Statistic className='!inline' valueStyle={{fontSize: 12, display: 'inline'}} value={coupon.minimum_purchase} decimalSeparator=','/> تومان </Typography.Text>
                        </Col>
                    </Row>
                </Card>
            )
        })
    }
    return (
        <Layout>
            <PageContainer loading={fetchLoading}>
                <Row>
                    <Col span={24}>
                        <div className='grid grid-cols-4 gap-7'>
                            {renderCouponCard()}
                        </div>
                    </Col>
                </Row>
                <Row justify="center" align="bottom" className="mt-6 mb-6">
                    {
                        paginationMeta && paginationMeta.meta.last_page > 1
                            ?  <Col>
                                <ANTDPagination
                                    onChange={(current,size) => {
                                        setPage(current)
                                    }}
                                    current={paginationMeta.meta.current_page}
                                    total={paginationMeta.meta.total}
                                    pageSize={paginationMeta.meta.per_page}
                                    showSizeChanger={false}
                                />
                            </Col>
                            : ''
                    }
                </Row>
            </PageContainer>
        </Layout>
    )

}

export default Coupon;