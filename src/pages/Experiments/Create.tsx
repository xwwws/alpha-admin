import { createExperiment, getExperimentDetailsById } from '@/api/experiments';
import { getAreasMap } from '@/api/public';
import CreateStepItem from '@/pages/Experiments/components/CreateStepItem';
import { IForm } from '@/pages/typings';
import { CenterHolderStyle, formItemLayout } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'umi';
import { useSearchParams } from "@@/exports";
import { fmtRequestParams, fmtResToFormData } from "@/pages/Experiments/hooks/experimentHooks";
import { getProjects } from "@/api/project";

const Create: React.FC = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [reaction, setReaction] = useState<{ label: string; value: string }[]>([]);
  const [ projects, setProjects ] = useState<{ label: string; value: string }[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    (async () => {
      const res = await getAreasMap('reaction');
      setReaction(res.data.map((item) => ({ label: item.label, value: item.name })));
    })();
    (async () => {
      const res = await getProjects({page:1,page_size:9999})
      setProjects(res.data.data.map(pro => ({label:pro.name,value:pro.id + ''})));
    })()
    const copyId = searchParams.get('id')
    if(copyId) {
      (async () => {
        const res = await getExperimentDetailsById(copyId)
        form.setFieldsValue(fmtResToFormData(res.data))


      })()
    }
  }, []);
  const formRules: IForm.IFormRules = {
    name: [{ required: true, message: '请输入实验名称' }],
    bottle_area_name: [{ required: true, message: '请选择反应器工位' }],
    project_id: [{ required: true, message: '请选择项目' }],
    coordinates: [
      { required: true, message: '请输入坐标' },
      { pattern: /^\d+$/, message: '坐标输入错误' },
      { max: 10, message: '坐标长度过长' },
    ],
    bottle_height: [
      { required: true, message: '请输入高度' },
      { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
      { max: 6, message: '数值过大' },
    ],
  };
  /**
   * 表单验证成功回调
   * @param values
   */
  const onFinish = async (values: any) => {
    if (!values.steps_data || values.steps_data?.length === 0) {
      message.warning('请添加步骤');
      return;
    }
    setSubmitLoading(true);
    await createExperiment(fmtRequestParams(values));
    message.success('创建成功');
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
            <Form.Item
              name="project_id"
              label="项目"
              rules={formRules.project_id}
            >
              <Select options={projects} />
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

            <Form.Item name="bottle_height" label="瓶型" rules={formRules.bottle_height}>
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
      </PageContainer>
    </>
  );
};
export default Create;
