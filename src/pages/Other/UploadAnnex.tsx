import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Upload, UploadFile } from 'antd';
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
    name: [ { required: true, message: '请输入名称' } ],
    y_axis_front: [ { required: true, message: '请输入升温曲线表头' } ],
    y_axis_back: [ { required: true, message: '请输入背温曲线表头' } ],
    file: [ { required: true, message: '请选择文件' } ],
    description: [ { required: false, message: '输入描述信息' } ]
  };

  const [ fileList, setFileList ] = useState<UploadFile[]>();


  const finish = async (data: any) => {
    const params: Other.UploadExpAnnex = {
      expt_id: data.expt_id,
      name: data.name,
      file: data.file.fileList[0].originFileObj,
      description: data.description || '',
      y_axis_front: data.y_axis_front,
      y_axis_back: data.y_axis_back,
    };
    console.log(params);
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

            <Form.Item label="升温曲线表头" name="y_axis_front" rules={formRules.y_axis_front}>
              <Input/>
            </Form.Item>

            <Form.Item label="背温曲线表头" name="y_axis_back" rules={formRules.y_axis_back}>
              <Input/>
            </Form.Item>

            <Form.Item label="描述" name="description" rules={formRules.description}>
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
