import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Select, Upload, UploadFile } from 'antd';
import React, { useState } from 'react';
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { IForm } from "@/pages/typings";
import { uploadAnnex } from "@/api/others";
import styled from "styled-components";
import { IndexTopStyle } from "@/utils/styleComponents";

interface IProps {
  [key: string]: any;
}

const ContentWarp = styled.div`
  margin: 0 auto;
  width: 600px;
`;

const UploadAnnex: React.FC<IProps> = (props) => {

  const [ form ] = Form.useForm();

  const formRules: IForm.IFormRules = {
    expt_id: [ { required: true, message: '请输入实验id' } ],
    name: [ { required: false, message: '请输入名称' } ],
    furnace: [ { required: true, message: '请选择马弗炉' } ],
    y_axis_front: [ { required: true, message: '请输入升温曲线表头' } ],
    y_axis_back: [ { required: true, message: '请输入背温曲线表头' } ],
    file: [ { required: true, message: '请选择文件' } ],
    description: [ { required: false, message: '输入描述信息' } ]
  };

  const [ fileList, setFileList ] = useState<UploadFile[]>();


  const finish = async (data: any) => {
    let y_axis_front = ''
    let y_axis_back = ''
    if(data.furnace === '1') {
      y_axis_front = `温控表1#PV(℃)`
      y_axis_back = `温控表2#PV(℃)`
    } else if (data.furnace === '3') {
      y_axis_front = `温控表3#PV(℃)`
      y_axis_back = `温控表4#PV(℃)`

    }
    const params: Other.UploadExpAnnex = {
      expt_id: data.expt_id,
      name: data.name,
      file: data.file.fileList[0].originFileObj,
      description: data.description || '',
      y_axis_front,
      y_axis_back,
    };
    await uploadAnnex(params);
    message.success('上传成功');
    form.resetFields()
    setFileList([])

  };


  return (
    <PageContainer>

      <IndexTopStyle>
        <a href="/user/login">主页 <HomeOutlined /></a>
      </IndexTopStyle>
      <Card title={'上传附件'}>
        <ContentWarp>
          <Form form={form} onFinish={finish}>
            <Form.Item label="实验id" name="expt_id" rules={formRules.expt_id}>
              <Input/>
            </Form.Item>

            <Form.Item label="名称" name="name" rules={formRules.name}>
              <Input/>
            </Form.Item>

            <Form.Item label="文件" name={'file'} rules={formRules.file}>
              <Upload
                beforeUpload={file => false}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined/>}>选择文件</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="马弗炉" name="furnace" rules={formRules.furnace}>
              <Select
                options={[
                  {label: '1号马弗炉', value: '1'},
                  {label: '3号马弗炉', value: '3'},
                ]}
              />
            </Form.Item>


            {/*<Form.Item label="升温曲线表头" name="y_axis_front" rules={formRules.y_axis_front}>*/}
            {/*  <Input addonBefore="温控表" addonAfter="#PV(℃)"/>*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label="背温曲线表头" name="y_axis_back" rules={formRules.y_axis_back}>*/}
            {/*  <Input addonBefore="温控表" addonAfter="#PV(℃)"/>*/}
            {/*</Form.Item>*/}

            <Form.Item label="备注" name="description" rules={formRules.description}>
              <Input.TextArea rows={2}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11 }}>
              <Button htmlType={'submit'} type={'primary'}>确定</Button>
            </Form.Item>
          </Form>
        </ContentWarp>
      </Card>
    </PageContainer>
  );
};

export default UploadAnnex;
