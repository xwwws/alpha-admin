import { getStepsMap } from '@/api/public';
import CreateStepItem from '@/pages/Experiments/components/CreateStepItem';
import { CenterHolderStyle, formItemLayout } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Create: React.FC = () => {
  const [form] = Form.useForm();
  const [stepsMap, setStepsMap] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const formRules = {
    name: [{ required: true, message: '请输入实验名称' }],
    bottle_area_name: [{ required: true, message: '请输入试剂名称' }],
    coordinates: [
      { required: true, message: '请输入坐标' },
      { pattern: /^\d+$/, message: '坐标输入错误' },
      { max: 10, message: '坐标长度过长' },
    ],
    bottle_height: [
      { required: true, message: '请输入高度' },
      { pattern: /^\d+$/, message: '高度应为数字' },
      { max: 6, message: '数值过大' },
    ],
  };
  useEffect(() => {
    (async () => {
      const res = await getStepsMap();
      setStepsMap(res);
    })();
  }, []);

  /**
   * 表单验证成功回调
   * @param values
   */
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    console.log(values.steps_data);
    if (!values.steps_data || values.steps_data?.length === 0) {
      messageApi.warning('请添加步骤');
      return;
    }
  };
  const formList = (
    <Form.List name="steps_data">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <CreateStepItem
              key={key}
              index={key}
              stepsMap={stepsMap}
              name={name}
              restField={restField}
              onDelete={() => remove(name)}
            ></CreateStepItem>
          ))}
          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
              添加步骤
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
  return (
    <>
      <PageContainer>
        <Card>
          <Form
            style={{ width: '800px', margin: '0 auto' }}
            form={form}
            {...formItemLayout}
            onFinish={onFinish}
          >
            <Form.Item name="name" label="实验名称" rules={formRules.name}>
              <Input />
            </Form.Item>
            <Form.Item
              name="bottle_area_name"
              label="试剂瓶名称"
              rules={formRules.bottle_area_name}
            >
              <Input />
            </Form.Item>

            <Form.Item name="bottle_area_x" label="x" rules={formRules.coordinates}>
              <Input />
            </Form.Item>

            <Form.Item name="bottle_area_y" label="y" rules={formRules.coordinates}>
              <Input />
            </Form.Item>

            <Form.Item name="bottle_area_z" label="z" rules={formRules.coordinates}>
              <Input />
            </Form.Item>

            <Form.Item name="bottle_height" label="高度" rules={formRules.bottle_height}>
              <Input />
            </Form.Item>
            {formList}
            <Form.Item wrapperCol={{ span: 24 }}>
              <CenterHolderStyle>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </CenterHolderStyle>
            </Form.Item>
          </Form>
        </Card>
        {contextHolder}
      </PageContainer>
    </>
  );
};
export default Create;
