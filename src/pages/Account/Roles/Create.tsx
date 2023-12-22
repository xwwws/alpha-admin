import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Select } from 'antd';
import React from 'react';
import styled from "styled-components";
import { IForm } from "@/pages/typings";
import { createRoles } from "@/api/roles";
import { useNavigate } from "@@/exports";

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
  name: [ { required: true, message: '请输入角色名称' } ],
  description: [ { required: true, message: '请输入备注' } ],
};
const Create: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const  navigate = useNavigate()
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    await createRoles(formData);
    message.success('角色创建成功');
    form.resetFields();
    navigate('/account/roles/list')
  };
  return (
    <PageContainer>
      <Card>
        <FormWrap>
          <Form form={form}>
            <Form.Item
              label={"角色名称"}
              name={'name'}
              rules={formRules.name}
            >
              <Input/>
            </Form.Item>


            <Form.Item
              label={"角色备注"}
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
    </PageContainer>
  );
};

export default Create;
