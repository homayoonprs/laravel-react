import React, {ReactElement, ReactPropTypes, useContext, useEffect} from 'react'
import Layout from '../../components/layouts/authentication'
import { authContext } from '@/services/auth/useAuth';
import {Button, Form, Input, Checkbox, Space, Divider} from "antd";
import {Link, useNavigate} from "react-router-dom";
import { isAdmin } from '@/utils/auth';

const clientHomeURL = '/client/plan';
const adminHomeURL = '/admin/home';

const Login = (  ) => {

    const [loading, setLoading] = React.useState(false);

    let auth = useContext(authContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if(!auth?.loading && auth?.isAuthenticated && auth.user){
            navigate(isAdmin(auth.user) ? adminHomeURL : clientHomeURL )
        }
    },[auth])

    const handleLogin = async () => {
        setLoading(true);
        auth?.login(form.getFieldsValue()).then(() => {
            setLoading(false);
        }).catch((res) => {
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Layout>
            <div className='flex flex-row w-screen h-screen justify-center items-center'>
                <div className='flex-col flex-1 border shadow p-4 max-w-md m-auto bg-white'>
                    
                    <Divider/>
                    <Form layout="vertical" form={form}>
                        <Form.Item name='email' label='ایمیل' validateStatus={auth?.error && auth.error.errors.email ? 'error' : ''} help={auth?.error && auth.error.errors.email ? auth.error.errors.email : ''}>
                            <Input
                                placeholder='ایمیل خود را وارد کنید'
                            />
                        </Form.Item>
                        <Form.Item name='password' label='رمز ورود' validateStatus={auth?.error && auth.error.errors.password ? 'error' : ''} help={auth?.error && auth.error.errors.password ? auth.error.errors.password : ''}>
                            <Input.Password
                                size='small'
                                placeholder='رمز ورود خود را وارد کنید'
                            />
                        </Form.Item>
                        <Form.Item name='remember' label='مرا به خاطر بسپار'>
                            <Checkbox onChange={e => form.setFieldValue('remember',e.target.checked)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button block onClick={handleLogin} loading={loading} type='primary'>ورود</Button>
                        </Form.Item>
                    </Form>

                    {/* <div className="flex flex-1 items-center justify-center mt-4 text-sm">
                        <Link to={'/home'}><a className='hover:text-primary transition-all cursor-pointer'>بازیابی رمزعبور</a></Link>
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default Login
