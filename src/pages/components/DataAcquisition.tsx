import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { ITypes } from "@/pages/typings";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getReadNodeList } from "@/api/methods";

interface IProps {
  name: (string | number)[];
  [key: string]: any;
}

const ButtonWarp = styled.div`
  display: flex;
  flex-direction: row-reverse;

  .button {
    width: 120px;
    margin-bottom: 10px;
  }
`;
const DataAcquisition: React.FC<IProps> = (props) => {
  const {  name } = props;
  const [ nodes, setNodes ] = useState<ITypes.EnumType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getReadNodeList();
      setNodes(res.data.map((item): ITypes.EnumType => ({ label: item.name, value: item.nodeid })));
    })();
  }, []);
  return (
    <div style={{ marginBottom: '10px' }}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            <ButtonWarp>
              <Button className={"button"} onClick={() => add()} block icon={<PlusOutlined/>}>
                采集数据
              </Button>
            </ButtonWarp>
            {fields.map((subField, key) => (
              <Row gutter={10} key={key} style={{ margin: '5px 0' }}>
                <Col span={11}>
                  <Form.Item label={'采集数据'} name={[ subField.name, 'nodeid' ]}>
                    <Select options={nodes}/>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item label={'间隔'} name={[ subField.name, 'interval' ]}>
                    <Input addonAfter={'s'}/>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    type={'link'}
                    style={{ color: '#000' }}
                    onClick={() => remove(subField.name)}
                    block
                    icon={<CloseOutlined/>}
                  />
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default DataAcquisition;
