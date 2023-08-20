

import React, { createContext, FC, ReactElement, useContext, useEffect, useState } from 'react'
import gateway from '../gateway';
import { APIErrorResponse, APIResponse, ILogin } from '@/types/index';
import { userType } from '@/types/Models/user.type';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

const loginURL = '/client/auth/login';
const clientHomeURL = '/client/plan';
const adminHomeURL = '/admin/home';

interface AuthProviderProps {
    children: ReactElement;
}

interface authContextInterface {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>
    login: (payload: ILogin) => Promise<any>;
    logout: () => any;
    getMe: () => Promise<any>;
    error: APIErrorResponse|null;
    setError: React.Dispatch<React.SetStateAction<APIErrorResponse | null>>
    isAuthenticated: boolean;
    loading: boolean;
}


export const authContext = createContext<authContextInterface|null>(null);

export const ProvideAuth = (props: AuthProviderProps) => {
    return <authContext.Provider value={useProvideAuth()}>{props.children} </authContext.Provider>;
}

const useProvideAuth = (): authContextInterface => {

    const [user, setUser] = useState<userType|null>(null);
    const [error, setError] = useState<APIErrorResponse|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const refreshUser = async () => {
        try{
            await getMe()
        }catch{
            logout()
        }
    }

    useEffect(() => {
        if(user === null) {
            refreshUser()
        }
    },[])

    const login = async (payload: ILogin) => {
        setLoading(true);
        await gateway.getCSRFCookie()
        let response = gateway.login(payload).then(res => {
            setUser(res.data);
            setIsAuthenticated(true)
        }).catch((reason: any) => {
            setError(reason.response.data);
            setIsAuthenticated(false)
            setUser(null)
            
        }).finally(() => setLoading(false))
        return response;
    }

    const logout = async () => {
        setLoading(true)
        let response = gateway.logout().then(() => {
            setUser(null);
            setIsAuthenticated(false);
        }).finally(() => {
            setIsAuthenticated(false);
            navigate(loginURL);
        }).finally(() => setLoading(false))
        return response;
    }

    const getMe = async () => {
        setLoading(true)
        let response = gateway.getMe().then((res: any) => {
            let {data} = res;
            setUser(data);
            setIsAuthenticated(true);
        }).catch((err: any) => {
            setIsAuthenticated(false);
            setUser(null);
            navigate(loginURL);
        }).finally(() => setLoading(false))
        return response;
    }


    return {
        user,
        setUser,
        error,
        setError,
        isAuthenticated,
        loading,
        login,
        logout,
        getMe,
    }
}


