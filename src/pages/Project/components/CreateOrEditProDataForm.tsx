import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "@@/exports";
import { IForm } from "@/pages/typings";
import { createProData } from "@/api/project";
import styled from 'styled-components';

export interface IDataItemInfo {
  name?: string;
  titles?: string;
  sql?: string;
  description?: string;
}

interface IProps {
  submit: (values: any) => Promise<void>;
  data?: IDataItemInfo;

  [key: string]: any;
}
const FormStyle = styled.div`
  width: 600px;
  margin: 0 auto;
`
const CreateOrEditProDataForm: React.FC<IProps> = (props) => {
  const { submit, data } = props;

  const { proId } = useParams();
  const navigate = useNavigate();
  const [ form ] = Form.useForm();
  const [ loading, setLoading ] = useState<boolean>(false);
  const formRules: IForm.IFormRules = {
    name: [ { required: true, message: '请输入名称' } ],
    titles: [
      { required: true, message: '请输入表头' }
    ],
    sql: [ { required: true, message: '请输入名称' } ],
    description: []

  };
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await submit(values);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data?.name) {
      form.setFieldsValue(data);
    }
  }, [ data ]);
  return (
    <FormStyle>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name={'name'}
          label={'名称'}
          rules={formRules.name}
        >
          <Input
            placeholder={'请输入名称'}
          />
        </Form.Item>
        <Form.Item
          name={'titles'}
          label={'表头'}
          rules={formRules.titles}
        >
          <Input.TextArea
            autoSize={{ maxRows: 10, minRows: 2 }}
            placeholder={'请输入表头,用英文逗号隔开'}
          />
        </Form.Item>
        <Form.Item
          name={'sql'}
          label={'sql'}
          rules={formRules.sql}
        >
          <Input.TextArea
            autoSize={{ maxRows: 10, minRows: 2 }}
            placeholder={'请输入sql'}
          />
        </Form.Item>
        <Form.Item
          name={'description'}
          label={'备注'}
          rules={formRules.description}
        >
          <Input.TextArea
            autoSize={{ maxRows: 10, minRows: 2 }}
            placeholder={'请输入备注'}
          />
        </Form.Item>

        <Form.Item wrapperCol={{offset:11}}>
          <Button loading={loading} type={'primary'} htmlType={'submit'}>提交</Button>
        </Form.Item>
      </Form>
    </FormStyle>
  );
};

export default CreateOrEditProDataForm;
