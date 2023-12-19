import { createExperiment, getExperimentDetailsById } from '@/api/experiments';
import { getAreasMap } from '@/api/public';
import CreateStepItem from '@/pages/Experiments/components/CreateStepItem';
import { IForm, ITypes } from '@/pages/typings';
import { CenterHolderStyle, formItemLayout } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'umi';
import { useSearchParams } from "@@/exports";
import { fmtRequestParams, fmtResToFormData } from "@/pages/Experiments/hooks/experimentHooks";
import { getProjects } from "@/api/project";
import { getReadNodeList } from "@/api/methods";
import DataAcquisition from "@/pages/components/DataAcquisition";

const Create: React.FC = () => {

  const [ form ] = Form.useForm();
  const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);
  const [ reaction, setReaction ] = useState<{ label: string; value: string }[]>([]);
  const [ projects, setProjects ] = useState<{ label: string; value: string }[]>([]);
  const [ nodes, setNodes ] = useState<ITypes.EnumType[]>([]);
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  useEffect(() => {
    (async () => {
      const res = await getAreasMap('reaction');
      setReaction(res.data.map((item) => ({ label: item.label, value: item.name })));
    })();
    (async () => {
      const res = await getProjects({ page: 1, page_size: 9999 });
      setProjects(res.data.data.map(pro => ({ label: pro.name, value: pro.id + '' })));
    })();
    const copyId = searchParams.get('id');
    if (copyId) {
      (async () => {
        const res = await getExperimentDetailsById(copyId);
        form.setFieldsValue(fmtResToFormData(res.data));
      })();
    }


    (async () => {
      const res = await getReadNodeList();
      setNodes(res.data.map((item): ITypes.EnumType => ({ label: item.name, value: item.nodeid })));
    })();
  }, []);
  const formRules: IForm.IFormRules = {
    name: [ { required: true, message: '请输入实验名称' } ],
    bottle_area_name: [ { required: true, message: '请选择反应器工位' } ],
    project_id: [ { required: true, message: '请选择项目' } ],
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
    if (!values.steps_data || values.steps_data.length === 0) {
      message.warning('请添加步骤');
      return;
    }
    if (submitLoading) {
      message.warning('请勿重复提交');
      return;
    }
    setSubmitLoading(true);
    try {
      await createExperiment(fmtRequestParams(values));
      message.success('创建成功');
      navigate('/exp/experiment/list');

    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
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
            <Button type="dashed" onClick={add} block icon={<PlusOutlined/>}>
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
            <Row gutter={10}>
              {/*row-1*/}
              <Col span={12}>
                <Form.Item name="name" label="实验名称" rules={formRules.name}>
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
              </Col>


              {/*row-2*/}
              <Col span={12}>
                <Form.Item
                  name="project_id"
                  label="项目"
                  rules={formRules.project_id}
                >
                  <Select options={projects}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="bottle_height" label="瓶型" rules={formRules.bottle_height}>
                  <Input/>
                </Form.Item>
              </Col>



              {/*row-3*/}

              <Col span={12}>
                <Form.Item
                  labelCol={{span: 8}}
                  name="bottle_area_name"
                  label="反应器工位"
                  rules={formRules.bottle_area_name}
                >
                  <Select options={reaction}/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="bottle_area_x" label="x" rules={formRules.coordinates}>
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="bottle_area_y" label="y" rules={formRules.coordinates}>
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="bottle_area_z" label="z" rules={formRules.coordinates}>
                  <Input/>
                </Form.Item>
              </Col>
              {/*row-4*/}

              <Col span={12}>
                <Form.Item
                  labelCol={{span: 8}}
                  name="recycle_area_name"
                  label="回收工位"
                >
                  <Select options={reaction}/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="recycle_area_x" label="x">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="recycle_area_y" label="y">
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="recycle_area_z" label="z">
                  <Input/>
                </Form.Item>
              </Col>

            </Row>

            <DataAcquisition name={['data_acquisitions']}/>
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
