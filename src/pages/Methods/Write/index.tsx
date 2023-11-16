import { getReadNodeList, writeMethod } from '@/api/methods';
import { ITypes } from '@/pages/typings';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Input, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import MethodsHis from "@/pages/Methods/components/MethodsHis";
import MethodsView from "@/pages/Methods/components/MethodsView";
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const Index: React.FC = () => {

  const [ form ] = Form.useForm();
  const [ nodes, setNodes ] = useState<ITypes.EnumType[]>([]);
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);



  /**
   * 开始写
   * @param val
   */
  const onFinish = async (val: Methods.Write) => {
    try {
      setLoading(true);
      const { data } = await writeMethod(val);
      setLoading(false);
      setReadResult(JSON.stringify(data.result));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    // 获取下拉数据
    (async () => {
      const res = await getReadNodeList();
      setNodes(res.data.map((item): ITypes.EnumType => ({
        label: item.custom_name,
        value: item.nodeid,
        value_type: item.value_type,
      })));
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
      <Form.Item name="node_index" label="节点id" rules={[ { required: true, message: '请选择节点' } ]}>
        <Select
          allowClear={true}
          style={{ width: `150px` }}
          options={nodes}
          placeholder={'请选择节点'}
        />
      </Form.Item>

      <Form.Item name="node_value" label="节点id" rules={[ { required: true, message: '请输入内容' } ]}>
        <Input
          style={{ width: `150px` }}
          placeholder={'请选择节点'}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type={'primary'} htmlType="submit">
          确定
        </Button>

        {/*<Button type={'primary'} onClick={disConnect}>*/}
        {/*  断开*/}
        {/*</Button>*/}
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
          <br/>
          {/**/}
        </Card>
        <MethodsHis methodMode={'write'}/>
      </PageContainer>
    </>
  );
};

export default Index;
