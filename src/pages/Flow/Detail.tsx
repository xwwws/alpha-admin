import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getFlowDetail } from "@/api/flows";
import PreAndNext from "@/pages/components/PreAndNext";
import { useNavigate } from "@@/exports";
import FlowDetail from "@/pages/Flow/components/Detail/FlowDetail";
import FlowDetailWrap from "@/pages/Flow/components/Detail/FlowDetailWrap";

interface IProps {
  [key: string]: any;
}

const Detail: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ flowDetail, setFlowDetail ] = useState<Flows.Detail>();

  /**
   * 获取工作流详情信息
   */
  const getDetail = async () => {
    const res = await getFlowDetail(id as string);
    setFlowDetail(res.data);
  };
  /**
   * 上一条 下一条
   * @param type
   */
  const handlePrevOrNext = async (type: string) => {
    const res = await getFlowDetail(id as string, {
      sibling: type
    });
    if (`${res.data.id}` === id) {
      message.warning(`已经是${type === 'prev' ? '第' : '最后'}一条了`);
    } else {
      navigate(`/exp/flow/${res.data.id}/detail`, { replace: true });
    }
  };


  useEffect(() => {
    getDetail();
  }, [ id ]);
  return (
    <PageContainer
      extra={[
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/flow/${id}/record`, { replace: true })}
        >
          查看记录
        </Button>,
      ]}>
      <Card>
        {/*上下一条导航*/}
        <PreAndNext onPreOrNext={handlePrevOrNext}/>
        {
          flowDetail && <>
            {/*工作流基本信息*/}
            <FlowDetail
              detail={flowDetail}
            />

            {/*工作流指令信息*/}
            <FlowDetailWrap flowData={flowDetail.flow_data}/>
          </>
        }
      </Card>
    </PageContainer>
  );
};

export default Detail;
