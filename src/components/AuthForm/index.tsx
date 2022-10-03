import { FC } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/actions/user';
import { Button, Form, Input } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import '../../styles/blocks/auth-form.scss';

export interface LoginValues {
  password: string
  email: string
}

const AuthForm: FC = () => {
  const dispatch = useAppDispatch();

  const onFinishLogin = (values: LoginValues) => {
    // console.log('Received values of form: ', values);
    dispatch(login(values));
  };

  return (
    <Form
      name="login"
      className="auth-form"
      // initialValues={{ remember: true }}
      onFinish={onFinishLogin}
    >
      <div className='auth-form__title'>
        Sign in
      </div>
      <Form.Item
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
      >
        <Input type='email' prefix={<MailOutlined className="auth-form__item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="auth-form__item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="auth-form__submit-btn">
          Log in
        </Button>
        Or <Button type='link' className='auth-form__link-btn'>register now!</Button>
      </Form.Item>
    </Form>
  );
}

export default AuthForm;