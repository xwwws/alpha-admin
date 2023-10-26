// @ts-ignore
import { pipette } from '@/api/steps';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { IForm } from '@/pages/typings';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import StepHis from "@/pages/Steps/components/StepHis";
import DataAcquisition from "@/pages/components/DataAcquisition";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const contentItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface IConditions {
  src_area_name: string;
  src_area_x: string | number;
  src_area_y: string | number;
  src_area_z: string | number;
  dst_area_name: string;
  dst_area_x: string | number;
  dst_area_y: string | number;
  dst_area_z: string | number;
  tip_length: string | number;
  total: string | number;
  take_once: string | number;
  spit_once: string | number;
  interval: string | number;
  height: string | number;
  speed: string | number;
  data_acquisitions: API.data_acquisitionParams[];
}

const formRules: IForm.IFormRules = {
  src_area_name: [ { required: true, message: '请选择托盘区域' } ],
  dst_area_name: [ { required: true, message: '请选择托盘区域' } ],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  height: [
    { required: true, message: '请输入高度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '高度过高' },
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
      const params: API.Pipette = {
        src_area: {
          name: val.src_area_name,
          x: val.src_area_x,
          y: val.src_area_y,
          z: val.src_area_z,
        },
        dst_area: {
          name: val.dst_area_name,
          x: val.dst_area_x,
          y: val.dst_area_y,
          z: val.dst_area_z,
        },
        tip_length: val.tip_length,
        total: val.total,
        take_once: val.take_once,
        height: val.height,
        spit_once: val.spit_once,
        speed: val.speed,
        interval: val.interval,
        data_acquisitions: val.data_acquisitions
      };
      const { data } = await pipette(params);
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
      colon={false}
      onFinish={onFinish}
    >
      <Row>
        {/*第一行*/}
        <Col span={9}>
          <Form.Item
            labelCol={{ span: 6 }}
            name="src_area_name"
            label="托盘区域"
            rules={formRules.src_area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item name="src_area_x" label="x" rules={formRules.coordinates}>
            <Input/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item name="src_area_y" label="y" rules={formRules.coordinates}>
            <Input/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item name="src_area_z" label="z" rules={formRules.coordinates}>
            <Input/>
          </Form.Item>
        </Col>

        {/*第二行*/}
        <Col span={9}>
          <Form.Item
            labelCol={{ span: 6 }}
            name="dst_area_name"
            label="目标区域"
            rules={formRules.dst_area_name}
          >
            <Select options={areas}/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item name="dst_area_x" label="x" rules={formRules.coordinates}>
            <Input/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item name="dst_area_y" label="y" rules={formRules.coordinates}>
            <Input/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item name="dst_area_z" label="z" rules={formRules.coordinates}>
            <Input/>
          </Form.Item>
        </Col>


        {/*第三行*/}
        <Col span={9}>
          <Form.Item
            labelCol={{ span: 6 }}
            name="tip_length"
            label="枪头长度"
            rules={formRules.height}
          >
            <Input addonAfter="cm"/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            labelCol={{ span: 7 }}
            name="height"
            label="高度"
            rules={formRules.height}
          >
            <Input addonAfter="cm"/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            labelCol={{ span: 11 }}
            name="total"
            label="移液总量"
            rules={formRules.height}
          >
            <Input addonAfter="ml"/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            labelCol={{ span: 12 }}
            name="take_once"
            label="单次吸液量"
            rules={formRules.height}
          >
            <Input addonAfter="ml"/>
          </Form.Item>
        </Col>


        {/*  第四行*/}
        <Col span={6}>
          <Form.Item

            {...contentItemLayout}
            name="spit_once"
            label="单次吐液量"
            rules={formRules.height}
          >
            <Input addonAfter="ml"/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item

            {...contentItemLayout}
            name="interval"
            label="吐液间隔时长"
            rules={formRules.height}
          >
            <Input addonAfter="s"/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            {...contentItemLayout}
            name="speed"
            label="吸液吐液速度"
            rules={formRules.height}
          >
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
        <StepHis stepMode={'pipette_step'}/>
      </PageContainer>
    </>
  );
};

export default Index;
