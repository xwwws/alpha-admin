import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import styled from "styled-components";
import { IForm } from "@/pages/typings";
import { useNavigate, useParams } from "umi";
import { editMenu, menuInfo } from "@/api/menus";

interface IProps {
  [key: string]: any;
}

const FormWrap = styled.div`
  width: 500px;
  margin: 0 auto;
  .submitWrap{
    display: flex;
    justify-content: center;
  }
`;

const formRules: IForm.IFormRules = {
  name: [ { required: true, message: '请输入菜单名称' } ],
  description: [ { required: true, message: '请输入备注' } ],
};
const Edit: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const {id} = useParams();
  const navigate = useNavigate()
  const getMenu = async (id: string) => {
    const res = await menuInfo(id)
    form.setFieldsValue(res.data)
  }
  useEffect(() => {
    id &&  getMenu(id)
  }, [id])
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    id && await editMenu(id,formData);
    message.success('菜单修改成功');
    navigate('/account/menus/list')
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
    </PageContainer>
  );
};

export default Edit;
