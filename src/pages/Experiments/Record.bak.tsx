import { getExperimentLogsById,  getStepsByExperimentId } from '@/api/experiments';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from "@@/exports";
const ResultStyleWarp = styled.div`
  display: grid;
  gap: 10px;
`;
interface IProps {
  [key: string]: any;
}

const RecordStyle = styled.div`
  //background-color: #f8f8f8;
  .descriptions {
    padding: 10px 80px;
  }
`;
const Record: React.FC<IProps> = (props) => {
  const [record, setRecord] = useState<API.Experiments.ExperimentRecordRes[]>([]);
  const [steps, setSteps] = useState<API.Experiments.ExperimentStepsRes[]>([]);
  const s = [true, false, 0];
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    // 获取实验记录
    const getExperimentRecords =  async () => {
      const res = await getExperimentLogsById(id as string);
      setRecord(res.data);
    }
    getExperimentRecords()

    // 获取实验步骤信息
    const getExperimentSteps = async () => {
      const res = await getStepsByExperimentId(id as string);
      setSteps(res.data)
    }
    getExperimentSteps()


  }, [id]);
  return (
    <PageContainer
      extra={[
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/experiment/${id}/detail` , {replace: true})}
        >
          查看实验详情
        </Button>,
      ]}
    >
      <Card>
        {record.map((item, index) => {
          return (
            <RecordStyle key={item.id}>
              <Divider orientation={'left'}>
                {index + 1} : {item.label}
              </Divider>
              <div className="descriptions">
                <Descriptions colon={false} column={24}>
                  <Descriptions.Item span={12} label={'开始时间:'}>
                    {item.start_time}
                  </Descriptions.Item>
                  <Descriptions.Item span={12} label={'结束时间:'}>
                    {item.end_time}
                  </Descriptions.Item>
                  <Descriptions.Item span={24} label={'args:'}>
                    {item.args.join(' , ')}
                  </Descriptions.Item>
                  <Descriptions.Item span={24} label={'result:'}>
                    <ResultStyleWarp>
                      {item.result.map((resultItem, resultIndex) => (
                        <div key={resultIndex}>
                          <Tag>{`${resultItem}`}</Tag>
                        </div>
                      ))}
                    </ResultStyleWarp>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </RecordStyle>
          );
        })}
      </Card>
    </PageContainer>
  );
};
export default Record;
