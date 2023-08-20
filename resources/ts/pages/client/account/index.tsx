import Layout from '@/components/layouts/clientDashboard';
import gateway from '@/services/gateway';
import { IPaginationMeta } from '@/types/IPaginationMeta';
import { accountType } from '@/types/Models/account.type';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Pagination as ANTDPagination, Card, Typography, Descriptions, Divider, Statistic } from 'antd';
import moment from 'moment-jalaali';
import React, { FC, useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Account: FC = () => {
    const [fetchLoading, setFetchLoading] = useState<boolean>(false)
    const [accounts, setAccounts] = useState<accountType[]|[]>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setFetchLoading(true)
        gateway.clientGetAccounts(page).then(res => {
            let {data, links, meta} = res;
            setAccounts(data);
            setPaginationMeta({links, meta});
            
        }).finally(() => setFetchLoading(false))
    },[page])

    const renderAccountsCard = () => {
        return accounts.map((account, index) => {
            return (
                <Card className='shadow' key={index} title={account.plan.name}>
                    <Row gutter={[0,20]} justify={'center'} align={'middle'}>
                        <Col>
                            {ringProgress(account)}
                        </Col>
                        <Col span={24}>
                            <Divider/>
                            <Row gutter={[16,16]} justify={'center'}>
                                <Col span={10}>
                                    <Typography.Text>نام کاربری:</Typography.Text>
                                </Col>
                                <Col span={14}>
                                    <Typography.Paragraph copyable>{account.username}</Typography.Paragraph>    
                                </Col>
                                <Col span={10}>
                                    <Typography.Text> رمزعبور:</Typography.Text>
                                </Col>
                                <Col span={14}>
                                    <Typography.Paragraph copyable>{account.password}</Typography.Paragraph>
                                </Col>
                                <Col span={10}>
                                    <Typography.Text>تاریخ شروع:</Typography.Text>
                                </Col>
                                <Col span={14}>
                                    <Typography.Paragraph>{account.starts_at}</Typography.Paragraph>    
                                </Col>
                                <Col span={10}>
                                    <Typography.Text>تاریخ پایان:</Typography.Text>
                                </Col>
                                <Col span={14}>
                                    <Typography.Paragraph>{account.expire_at}</Typography.Paragraph>    
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Card>
            )
        })
    }

    const ringProgress = (account: accountType) => {        

        return (
            <CountdownCircleTimer
                size={110}
                strokeWidth={5}
                isPlaying={false}
                duration={account.days}
                initialRemainingTime={account.remaining_days}
                colors={['#22C55E', '#3B82F6', '#e11d48']}
                colorsTime={[account.days, Math.round(account.days / 2), 5]}
            >
                {({ remainingTime }) => remainingTime+' روز باقی مانده '}
            </CountdownCircleTimer>
        )
      };

    return (
        <Layout>
            <PageContainer loading={fetchLoading}>
                <Row>
                    <Col span={24}>
                        <div className='grid grid-cols-4 gap-7'>
                            {renderAccountsCard()}
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

export default Account;