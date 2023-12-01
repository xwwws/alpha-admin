import { login } from '@/api/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, history, useIntl, useModel } from 'umi';

import { Alert, Button, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import Settings from '../../../../config/defaultSettings';

import { setUser } from '@/utils/auth';
import { flushSync } from 'react-dom';
import styled from "styled-components";
import { IndexTopStyle } from "@/utils/styleComponents";
import { useNavigate } from "@@/exports";

const LoginMessage: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};


const Login: React.FC = () => {
  const { initAreas, initMethods, initSteps } = useModel('useExperimentModel');
  const [ userLoginState, setUserLoginState ] = useState<string>('');
  const [ type, setType ] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [ timestamps, setTimestamps ] = useState<number[]>([]);
  const navigate = useNavigate();
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const handleSubmit = async (values: API.UserLoginReq) => {
    try {
      // 登录
      const res = await login(values);
      if (res.msg === 'ok') {
        message.success('登录成功');
        const user = await setUser(res.data);
        flushSync(() => {
          setInitialState((s) => {
            return {
              ...s,
              currentUser: user as API.UserInfoRes,
            };
          });
        });
        const urlParams = new URL(window.location.href).searchParams;
        initAreas();
        initSteps();
        initMethods();
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(res.msg);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadPage = () => {
    const now = Date.now();
    if (timestamps.length > 0) {
      if(now - timestamps[timestamps.length - 1] > 500) {
        setTimestamps([ now ]);
      } else {
        setTimestamps([...timestamps, now ]);
      }
    } else {
      setTimestamps([ now ]);
    }
  };
  useEffect(() => {
    console.log(timestamps);
    if(timestamps.length >= 3) {
      navigate('/other/upload')
    }
  },[timestamps])

  return (
    <div className={containerClassName}>
      {/*<IndexTopStyle>*/}
      {/*  <a href="/other/upload">防火涂料烧蚀结果数据上传{'>>'}</a>*/}
      {/*</IndexTopStyle>*/}

      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" onClick={uploadPage}/>}
          title="计算化学合成平台监管系统"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          actions={[]}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginReq);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
              // {
              //   key: 'mobile',
              //   label: intl.formatMessage({
              //     id: 'pages.login.phoneLogin.tab',
              //     defaultMessage: '手机号登录',
              //   }),
              // },
            ]}
          />

          {userLoginState !== '' && <LoginMessage content={userLoginState}/>}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="passwd"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          ></div>
        </LoginForm>

      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default Login;
