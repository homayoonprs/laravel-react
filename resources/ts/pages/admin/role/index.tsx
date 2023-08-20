import React, {ButtonHTMLAttributes, FC, ReactElement, ReactEventHandler, useEffect, useState} from 'react'
import Layout from '@/components/layouts/adminDashboard';
import gateway from '@/services/gateway';
import {roleType} from '@/types/Models/role.type'
import {BreadcrumbType} from '@/components/UI/breadcrumb/breadcrumbInterface';
import RoleCard from "@/components/admin/role/card/RoleCard";
import {Link, useNavigate} from "react-router-dom";
import {RoleCardSkeleton} from "@/components/admin/role/card";
import {Button, Col, Empty, Input, Row, Pagination as ANTDPagination} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IPaginationMeta} from "@/types/IPaginationMeta";
import { usePermissions } from '@/hooks/usePermissions';

const Role = () => {

    const [roles, setRoles] = useState<roleType[] | []>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta|null>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const navigate = useNavigate();
    const [hasPermissionTo] = usePermissions()

    useEffect(() => {

        setLoading(true)
        gateway.getRoles(page,searchValue).then(res => {
            const {data, meta, links} = res
            setRoles(data);
            setPaginationMeta({
                links,
                meta
            })
        }).finally(() => setLoading(false));

    }, [searchValue,page])

    const deleteAction = async (role: roleType) => {
        return gateway.deleteRole(role.id).then(res => {
            let {data} = res;
            setRoles(roles?.filter(r => r.id !== data.id))
        }).catch(err => setLoading(false))
    }

    const onSearch = (search: string) => {
        setSearchValue(search)
    }

    const breadcrumbItems: BreadcrumbType[] = [
        {label: 'داشتبورد', href: '/admin/home'},
        {label: 'لیست نقش ها'},
    ]

    return (
        <Layout breadcrumb={breadcrumbItems}>
            <Row justify="space-between" className="mb-6 mt-3" align="middle" gutter={[16,12]}>
                <Col>
                    <Link to='/admin/role/create'>
                        {
                            hasPermissionTo('role_create')
                                ? <Button type="primary" size='middle' icon={<PlusOutlined />}>
                                    افزودن
                                </Button>
                                : ''
                        }
                    </Link>
                </Col>

                <Col span={6}>
                    <Input.Search placeholder="جستجو در نقش ها"  style={{width: '100%'}} enterButton onSearch={onSearch}/>
                </Col>
            </Row>
            <Row gutter={[16,24]} justify="start">
                {
                    !loading
                        ? roles.map((role, index) => (
                            <Col key={index} span={6}>
                                <RoleCard role={role} onDeleteClick={deleteAction} onEditClick={role => navigate(`/admin/role/${role.id}`)}/>
                            </Col>
                        ))
                        : Array.apply(null, Array(20)).map((item, index) => (
                            <Col key={index} span={6}>
                                <RoleCardSkeleton/>
                            </Col>
                        ))
                }
                {
                    !loading && !roles.length ? <Col span={24}><Empty /></Col> : ''
                }
            </Row>

            <Row justify="center" align="bottom" className="mt-6">
                {
                    paginationMeta && paginationMeta.meta.last_page > 1
                        ?  <Col>
                            <ANTDPagination
                                onChange={(current,size) => {
                                    setPage(current)
                                }}
                                current={paginationMeta.meta.current_page}
                                total={paginationMeta.meta.total}
                            />
                        </Col>
                        : ''
                }
            </Row>


        </Layout>
    )
}


export default Role;


