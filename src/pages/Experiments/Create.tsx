import { createExperiment } from '@/api/experiments';
import { getAreasMap } from '@/api/public';
import CreateStepItem from '@/pages/Experiments/components/CreateStepItem';
import { IForm } from '@/pages/typings';
import { CenterHolderStyle, formItemLayout } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'umi';

const Create: React.FC = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reaction, setReaction] = useState<{ label: string; value: string }[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getAreasMap('reaction');
      setReaction(res.data.map((item) => ({ label: item.label, value: item.name })));
    })();
  }, []);
  const formRules: IForm.IFormRules = {
    name: [{ required: true, message: '请输入实验名称' }],
    bottle_area_name: [{ required: true, message: '请选择反应器工位' }],
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
  /**
   * 将表单数据格式化为创建实验参数
   * @param values
   * @return {API.Experiments.CreateExperimentReq}
   */
  const fmtRequestParams = (values: any): API.Experiments.CreateExperimentReq => {
    const params: API.Experiments.CreateExperimentReq = {
      name: values.name,
      bottle_height: values.bottle_height,
      bottle_area: {
        name: values.bottle_area_name,
        x: values.bottle_area_x,
        y: values.bottle_area_y,
        z: values.bottle_area_z,
      },
      steps_data: [],
    };
    // 根据不同情况处理不同数据
    // TODO 优化代码 看起来不这么多
    values.steps_data.forEach((item: any) => {
      switch (item.step_name) {
        case 'add_solvent_step':
          params.steps_data.push({
            reagent_id: item.reagent_id,
            name: item.step_name,
            kwargs: {
              src_area: {
                name: item.src_area_name,
                x: item.src_area_x,
                y: item.src_area_y,
                z: item.src_area_z,
              },
              dst_area: {
                name: item.dst_area_name,
                x: item.dst_area_x,
                y: item.dst_area_y,
                z: item.dst_area_z,
              },
              speed: item.speed,
              weight: item.weight,
              accuracy: item.accuracy,
            },
          });
          break;
        case 'pipette_step':
          params.steps_data.push({
            reagent_id: item.reagent_id,
            name: item.step_name,
            kwargs: {
              src_area: {
                name: item.src_area_name,
                x: item.src_area_x,
                y: item.src_area_y,
                z: item.src_area_z,
              },
              dst_area: {
                name: item.dst_area_name,
                x: item.dst_area_x,
                y: item.dst_area_y,
                z: item.dst_area_z,
              },
              speed: item.speed,
              total: item.total,
              take_once: item.take_once,
              spit_once: item.spit_once,
              interval: item.interval,
              height: item.height,
              tip_length: item.tip_length,
            },
          });
          break;
        case 'add_solid_step':
          params.steps_data.push({
            reagent_id: item.reagent_id,
            name: item.step_name,
            kwargs: {
              src_area: {
                name: item.src_area_name,
                x: item.src_area_x,
                y: item.src_area_y,
                z: item.src_area_z,
              },
              dst_area: {
                name: item.dst_area_name,
                x: item.dst_area_x,
                y: item.dst_area_y,
                z: item.dst_area_z,
              },
              speed: item.speed,
              weight: item.weight,
              angel: item.angel,
              tolerance: item.tolerance,
              height: item.height,
            },
          });
          break;
      }
    });
    return params;
  };
  /**
   * 表单验证成功回调
   * @param values
   */
  const onFinish = async (values: any) => {
    if (!values.steps_data || values.steps_data?.length === 0) {
      messageApi.warning('请添加步骤');
      return;
    }
    setSubmitLoading(true);
    await createExperiment(fmtRequestParams(values));
    messageApi.success('创建成功');
    navigate('/exp/experiment/list');
    setSubmitLoading(false);
  };
  const formList = (
    <Form.List name="steps_data">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <CreateStepItem
              form={form}
              key={key}
              index={key}
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
              label="反应器工位"
              rules={formRules.bottle_area_name}
            >
              <Select options={reaction} />
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
                <Button type="primary" htmlType="submit" loading={submitLoading}>
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
