import React from 'react';
import {createBrowserRouter, Route, Routes as ReactRouterRoutes} from 'react-router-dom';

// Private Route Component
import { PrivateRoute } from '@/routes/privateRoute';

import AdminAndClientApp from "@/pages/App";

import PublicApp from "@/pages/public/App";

// Admin pages
import AdminHome from "@/pages/admin/home";
import AdminLogin from "@/pages/auth/login";
import AdminUser from "@/pages/admin/user";
import AdminUserDetail from "@/pages/admin/user/detail";
import AdminPlan from "@/pages/admin/plan";
import AdminPlanDetail from "@/pages/admin/plan/detail";
import AdminCoupon from "@/pages/admin/coupon";
import AdminGateway from '@/pages/admin/gateway';
import AdminInvoice from '@/pages/admin/invoice';
import AdminInvoiceDetail from '@/pages/admin/invoice/detail'
import AdminRole from "@/pages/admin/role";
import AdminRoleDetail from "@/pages/admin/role/detail";

// Client pages
import ClientPlan from '@/pages/client/plan';
import ClientAccount from '@/pages/client/account';
import ClientCoupon from '@/pages/client/coupon';
import PublicHome from '@/pages/public/plan';
import NotFount from '@/pages/errors/NotFount';

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFount/>
    },
    {
        path: '/admin',
        element: <AdminAndClientApp/>,
        children: [
            {
                path: '/admin/home',
                element: <PrivateRoute adminsOnlyAllowed component={AdminHome}/>
            },
            {
                path: '/admin/user',
                element: <PrivateRoute adminsOnlyAllowed component={AdminUser}/>
            },
            {
                path: '/admin/role',
                element: <PrivateRoute adminsOnlyAllowed component={AdminRole}/>
            },
            {
                path: '/admin/role/create',
                element: <PrivateRoute adminsOnlyAllowed component={AdminRoleDetail}/>
            },
            {
                path: '/admin/role/:id',
                element: <PrivateRoute adminsOnlyAllowed component={AdminRoleDetail}/>
            },
            {
                path: '/admin/user/create',
                element: <PrivateRoute adminsOnlyAllowed component={AdminUserDetail}/>
            },
            {
                path: '/admin/user/edit/:id',
                element: <PrivateRoute adminsOnlyAllowed component={AdminUserDetail}/>
            },
            {
                path: '/admin/plan',
                element: <PrivateRoute adminsOnlyAllowed component={AdminPlan}/>
            },
            {
                path: '/admin/plan/create',
                element: <PrivateRoute adminsOnlyAllowed component={AdminPlanDetail}/>
            },
            {
                path: '/admin/plan/edit/:id',
                element: <PrivateRoute adminsOnlyAllowed component={AdminPlanDetail}/>
            },
            {
                path: '/admin/coupon',
                element: <PrivateRoute adminsOnlyAllowed component={AdminCoupon}/>
            },
            {
                path: '/admin/gateway',
                element: <PrivateRoute adminsOnlyAllowed component={AdminGateway}/>
            },
            {
                path: '/admin/invoice',
                element: <PrivateRoute adminsOnlyAllowed component={AdminInvoice}/>
            },
            {
                path: '/admin/invoice/create',
                element: <PrivateRoute adminsOnlyAllowed component={AdminInvoiceDetail}/>
            },
            {
                path: '/admin/invoice/edit/:id',
                element: <PrivateRoute adminsOnlyAllowed component={AdminInvoiceDetail}/>
            }

        ]
    },
    {
        path: '/client',
        element: <AdminAndClientApp/>,
        children: [
            {
                path: '/client/plan',
                element: <PrivateRoute component={ClientPlan}/>
            },
            {
                path: '/client/account',
                element: <PrivateRoute component={ClientAccount}/>
            },
            {
                path: '/client/coupon',
                element: <PrivateRoute component={ClientCoupon}/>
            },
            {
                path: '/client/auth/login',
                element: <AdminLogin/>
            },
        ]
    },
    {
        path: '/',
        element: <PublicApp/>,
        children: [
            {
                path: '/',
                element: <PublicHome/>
            }
        ]
    }


])

export default router;
