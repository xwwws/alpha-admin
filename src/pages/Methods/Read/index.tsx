import { getReadNodeList, readMethod } from '@/api/methods';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { ITypes } from '@/pages/typings';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface IConditions {
  node_index: string | number;
}

const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [nodes, setNodes] = useState<ITypes.EnumType[]>([]);
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const res = await readMethod(val);
      setLoading(false);
      setReadResult(JSON.stringify(res.data.result));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      const res = await getReadNodeList();
      setNodes(res.data.map((item): ITypes.EnumType => ({ label: item.name, value: item.n_id })));
    })();
  }, []);
  // 顶部查询模块
  const searchModel = (
    <Form
      {...formItemLayout}
      layout={'inline'}
      form={form}
      style={{ maxWidth: 'none' }}
      onFinish={onFinish}
    >
      <Form.Item name="node_index" label="节点id" rules={[{required:true,message:'请选择节点'}]}>
        <Select
          allowClear={true}
          style={{ width: `150px` }}
          options={nodes}
          placeholder={'请选择节点'}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type={'primary'} htmlType="submit">
          确定
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <PageContainer>
        <Card>
          <MethodsView isLoading={loading} readResult={readResult}>
            {searchModel}
          </MethodsView>
        </Card>
      </PageContainer>
    </>
  );
};

export default Index;
