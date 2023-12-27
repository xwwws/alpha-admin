import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';
import styled from "styled-components";
import { IForm } from "@/pages/typings";
import { useNavigate } from "@@/exports";
import { useParams } from "react-router-dom";
import { createMenu } from "@/api/menus";

interface IProps {
  [key: string]: any;
}

const FormWrap = styled.div`
  width: 600px;
  margin: 0 auto;

  .submitWrap {
    display: flex;
    justify-content: center;
  }
`;

const formRules: IForm.IFormRules = {
  name: [ { required: true, message: '请输入菜单名称' } ],
  code: [ { required: true, message: '请输入标识' } ],
  description: [ { required: false, message: '请输入备注' } ],
};
const Create: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const { pid } = useParams();

  const [ messageApi, contextHolder ] = message.useMessage();
  const navigate = useNavigate();
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    pid && await createMenu({
      ...formData,
      parent_id: pid
    });
    messageApi.success('创建菜单成功');
    form.resetFields();
    navigate('/system/menus/list');
  };
  return (
    <PageContainer>
      <Card>
        <FormWrap>
          <Form form={form}>
            <Form.Item
              label={"菜单名称"}
              name={'name'}
              rules={formRules.name}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label={"标识"}
              name={'code'}
              rules={formRules.code}
            >
              <Input/>
            </Form.Item>


            <Form.Item
              label={"菜单备注"}
              name={'description'}
              rules={formRules.description}
            >
              <Input.TextArea
                autoSize
                showCount
                maxLength={500}
              />
            </Form.Item>

          </Form>
          <div className="submitWrap">
            <Button type="primary" onClick={handleConfirm}>确定</Button>
          </div>

        </FormWrap>
      </Card>
      {contextHolder}
    </PageContainer>
  );
};

export default Create;
