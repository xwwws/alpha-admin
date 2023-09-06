import { createProject, editProject, getProjectDetail } from '@/api/project';
import { IForm } from '@/pages/typings';
import { formItemLayout } from '@/utils';
import { useLocation, useNavigate, useParams } from '@@/exports';

import { Button, DatePicker, Form, Input, message } from 'antd';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  name: [{ required: true, message: '请输入项目名称' }],
  description: [{ required: true, message: '请输入描述信息' }],
};
const CreateOrEditProjectsForm: React.FC<IProps> = (props) => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useLayoutEffect(() => {
    const { pathname } = location;
    setIsEdit(pathname.includes('/project/edit'));
    // 是否是修改试剂页面
    if (isEdit) {
      (async () => {
        const res = await getProjectDetail(params.id as string);
        form.setFieldsValue({
          ...res.data,
          created_at: dayjs(res.data.created_at),
          updated_at: dayjs(res.data.updated_at)
        });
      })();
    }
  }, [location, params, isEdit]);
  const submit = async (val: API.Projects.CreateProject) => {
    setLoading(true);
    if (isEdit) {
      try {
        await editProject(params.id as string, val);
        setLoading(false);
        messageApi.success('编辑完成');
        navigate('/project');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await createProject(val);
        setLoading(false);
        messageApi.success('创建项目成功');
        navigate('/project');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      { contextHolder }
      <Form
        { ...formItemLayout }
        form={ form }
        onFinish={ submit }
        style={ { width: '700px', margin: '0 auto' } }
      >
        { params.id && (
          <Form.Item label={ 'id' }>
            <strong>{ params.id }</strong>
          </Form.Item>
        ) }
        <Form.Item label={ '项目名称' } name={ 'name' } rules={ formRules.name }>
          <Input></Input>
        </Form.Item>
        <Form.Item label={ '描述' } name={ 'description' } rules={ formRules.description }>
          <Input.TextArea
            autoSize={ { minRows: 2, maxRows: 6 } }
            maxLength={ 200 }
            showCount
          ></Input.TextArea>
        </Form.Item>
        { params.id && (
          <>
            <Form.Item label={ '创建时间' } name={ 'created_at' }>
              <DatePicker showTime  disabled/>
            </Form.Item>
            <Form.Item label={ '上次修改时间' } name={ 'updated_at' }>
              <DatePicker showTime  disabled/>
            </Form.Item>
          </>
        ) }
        <Form.Item wrapperCol={ { offset: 6 } }>
          <Button type="primary" htmlType={ 'submit' } loading={ loading }>
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateOrEditProjectsForm;
