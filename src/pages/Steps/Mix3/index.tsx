import { mix3Step } from '@/api/steps';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import StepHis from "@/pages/Steps/components/StepHis";
import DataAcquisition from "@/pages/components/DataAcquisition";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const contentItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface IConditions {
  dst_area_name: string;
  dst_area_x: string | number;
  dst_area_y: string | number;
  dst_area_z: string | number;
  time: string | number;
  data_acquisitions: API.data_acquisitionParams[];
}

const formRules = {
  area_name: [ { required: true, message: '请选择目标区域' } ],
  time: [
    { required: true, message: '搅拌时间' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '输入错误' },
  ],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
};
const Index: React.FC = () => {
  const [ form ] = Form.useForm();
  const [ readResult, setReadResult ] = useState<any>('');
  const [ loading, setLoading ] = useState<boolean>(false);
  const { areas } = useModel('useExperimentModel');
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const params: API.Mix3Step = {
        dst_area: {
          name: val.dst_area_name,
          x: val.dst_area_x,
          y: val.dst_area_y,
          z: val.dst_area_z,
        },
        time: val.time,
        data_acquisitions: val.data_acquisitions
      };
      const { data } = await mix3Step(params);
      setLoading(false);
      setReadResult(JSON.stringify(data.result));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // 顶部查询模块
  const searchModel = (
    <Form
      {...formItemLayout}
      labelWrap={true}
      form={form}
      initialValues={{ drop_pre: true }}
      colon={false}
      onFinish={onFinish}
    >
      <Row>
        {/*第一行*/}
        <Col span={9}>
          <Form.Item
            name="dst_area_name"
            label="目标区域"
            rules={formRules.area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            {...contentItemLayout}
            name="dst_area_x"
            label="x"
            rules={formRules.coordinates}
          >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            {...contentItemLayout}
            name="dst_area_y"
            label="y"
            rules={formRules.coordinates}
          >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            {...contentItemLayout}
            name="dst_area_z"
            label="z"
            rules={formRules.coordinates}
          >
            <Input/>
          </Form.Item>
        </Col>

        {/*第二行*/}
        <Col span={6}>
          <Form.Item name="time" label="时间" rules={formRules.time}>
            <Input addonAfter="s"/>
          </Form.Item>
        </Col>

        <Col span={24}>
          <DataAcquisition name={[ 'data_acquisitions' ]}/>
        </Col>

        <Col span={12} offset={11}>
          <Form.Item>
            <Button type={'primary'} htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Col>
      </Row>
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
        <StepHis stepMode={'heating_stir_step'}/>
      </PageContainer>
    </>
  );
};

export default Index;
