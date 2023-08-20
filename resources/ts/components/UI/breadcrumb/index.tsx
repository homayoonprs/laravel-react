import React from 'react'
import { BreadcrumbInterface } from './breadcrumbInterface';
import styles from './index.module.scss';
import {Link} from "react-router-dom";
import {Breadcrumb as ANTDBreadcrumb} from "antd";

const Breadcrumb = ({ items}: BreadcrumbInterface) => {

    return (
        <ANTDBreadcrumb>
            {items.map((item, index) => (
                item.href 
                    ?   <ANTDBreadcrumb.Item key={index} children={<Link to={item.href}>{item.label}</Link>}/>
                    :   <ANTDBreadcrumb.Item key={index}>{item.label}</ANTDBreadcrumb.Item>
            ))}
        </ANTDBreadcrumb>
    )

}

export default Breadcrumb;
