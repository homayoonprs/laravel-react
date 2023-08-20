import { authContext } from '@/services/auth/useAuth';
import { isAdmin } from '@/utils/auth';
import { Spin } from 'antd';
import { FC } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface IPrivateRoute
{
    component: React.ComponentType
    adminsOnlyAllowed?: boolean
}

const loginURL = '/client/auth/login';
const clienHomeURL = '/client/plan';

export const PrivateRoute: FC<IPrivateRoute> = ({component: RouteComponent, adminsOnlyAllowed}) => {

    let auth = useContext(authContext)
    let location = useLocation();

    if(auth?.loading){
        return (
            <div className='w-screen h-screen bg- flex flex-1 justify-center items-center'>
                <Spin spinning size='large' tip="لطفا صبر کنید..."/>
            </div>
        )
    }

    if(!auth?.isAuthenticated || !auth?.user){
        return <Navigate to={loginURL} state={{ from: location }} replace />;
    }

    if(adminsOnlyAllowed && !isAdmin(auth.user)){
        return <Navigate to={clienHomeURL} state={{ from: location }} replace />;
    }

    return <RouteComponent/>

}