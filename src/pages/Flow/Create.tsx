import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, message, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CenterHolderStyle, formItemLayout } from "@/utils";
import { IForm } from "@/pages/typings";
import { PlusOutlined } from "@ant-design/icons";
import { getProjects } from "@/api/project";
import DataAcquisition from "@/pages/components/DataAcquisition";
import CreateMethodItem from "@/pages/Flow/components/CreateMethodItem";
import { createFlow } from "@/api/flows";
import { fmtFlowRequestParams } from "@/pages/Flow/tools/CreateTools";
import { useNavigate } from "umi";

interface IProps {
  [key: string]: any;
}

const Create: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);
  const [ projects, setProjects ] = useState<{ label: string; value: string }[]>([]);
  const [ messageApi, contextHolder ] = message.useMessage();
  const navigate = useNavigate();

  /**
   * 获取项目数据
   */
  const getProjectData = async () => {
    const res = await getProjects({ page: 1, page_size: 9999 });
    setProjects(res.data.data.map(pro => ({ label: pro.name, value: pro.id + '' })));
  };
  const onFinish = async (values: any) => {
    if (!values.flow_data || values.flow_data.length === 0) {
      message.warning('请添加指令');
      return;
    }
    await createFlow(fmtFlowRequestParams(values));
    messageApi.success('创建成功');
    navigate('/exp/flow/list');
  };

  const formRules: IForm.IFormRules = {
    name: [ { required: true, message: '请输入名称' } ],
    project_id: [ { required: true, message: '请选择项目' } ]
  };

  useEffect(() => {
    // 获取项目数据
    getProjectData();
  }, []);

  const formList = (
    <Form.List name="flow_data">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <CreateMethodItem
              form={form}
              key={key}
              index={key}
              name={name}
              restField={restField}
              onDelete={() => remove(name)}
            ></CreateMethodItem>
          ))}
          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button type="dashed" onClick={add} block icon={<PlusOutlined/>}>
              添加指令
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
  return (
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
              <Form.Item name="name" label="名称" rules={formRules.name}>
                <Input/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="project_id" label="所属项目" rules={formRules.project_id}>
                <Select options={projects}/>
              </Form.Item>
            </Col>

            {/*row-2*/}

            <Col span={24}>
              <Form.Item
                name="description"
                label="描述"
                labelCol={{ span: 3 }}
              >
                <Input.TextArea/>
              </Form.Item>
            </Col>
          </Row>
          <DataAcquisition name={[ 'data_acquisitions' ]}/>
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
  );
};

export default Create;
