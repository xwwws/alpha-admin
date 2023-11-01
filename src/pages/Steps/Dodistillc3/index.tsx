import { dodistillc3step } from '@/api/steps';
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
  area_name: [ { required: true, message: '请选择' } ],
  required: [ { required: true, message: '请填写' } ],
};
const Index: React.FC = () => {
  const [ form ] = Form.useForm();
  const [ readResult, setReadResult ] = useState<any>('');
  const [ loading, setLoading ] = useState<boolean>(false);
  const { areas } = useModel('useExperimentModel');
  const onFinish = async (val: Steps.Dodistillc3) => {
    try {
      console.log(val);
      setLoading(true);
      const params: Steps.Dodistillc3 = {
        ...val,
      };
      const { data } = await dodistillc3step(params);
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
        <Col span={6}>
          <Form.Item
            name="area_name"
            label="工位号"
            rules={formRules.area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="cooler_sy"
            label="冷凝温度"
            rules={formRules.required}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="heat_band_sy"
            labelCol={{ span: 12 }}
            label="加热带温度"
            rules={formRules.required}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="stir_temp"
            labelCol={{ span: 12 }}
            label="加热板温度"
            rules={formRules.required}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>


        {/*第2行*/}
        <Col span={6}>
          <Form.Item
            name="ibp_temp"
            label="初馏点"
            rules={formRules.required}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="fbp_temp"
            label="终馏点"
            rules={formRules.required}
          >
            <Input addonAfter={'℃'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="stir_mode"
            label="加热模式"
            rules={formRules.required}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="stir_rpm"
            label="搅拌速度"
            rules={formRules.required}
          >
            <Input/>
          </Form.Item>
        </Col>

        {/*第3行*/}
        <Col span={6}>
          <Form.Item
            name="wash_time"
            label="冲洗时长"
            rules={formRules.required}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="clean_time"
            label="排空时长"
            rules={formRules.required}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="suply_time"
            label="补给时长"
            rules={formRules.required}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="total_time"
            label="总时长"
            rules={formRules.required}
          >
            <Input addonAfter={'s'}/>
          </Form.Item>
        </Col>


        <Col offset={11} span={12}>
          <Button type={'primary'} htmlType="submit">
            确定
          </Button>
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
        <StepHis stepMode={'do_distill_c3'}/>
      </PageContainer>
    </>
  );
};

export default Index;
