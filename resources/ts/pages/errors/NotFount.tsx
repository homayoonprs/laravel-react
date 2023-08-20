import React, { FC } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFount: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="صفحه مورد نظر پیدا نشد"
    extra={
        <Link to={'/admin/home'}>
            <Button type="primary">بازگشت به خانه</Button>
        </Link>
    }
  />
);

export default NotFount;