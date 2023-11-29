import React from 'react';
import DetailRead from "@/pages/Flow/components/Detail/DetailRead";
import { Card } from "antd";
import DetailPrerequisite from "@/pages/Flow/components/Detail/DetailPrerequisite";
import DetailWrite from "@/pages/Flow/components/Detail/DetailWrite";
import { MethodsMap } from "@/utils/dataMaps";
import DetailMove from "@/pages/Flow/components/Detail/DetailMove";
import DetailSleep from "@/pages/Flow/components/Detail/DetailSleep";
import DetailAddSolid from "@/pages/Flow/components/Detail/DetailAddSolid";
import DetailAddSol from "@/pages/Flow/components/Detail/DetailAddSol";
import DetailUnCap from "@/pages/Flow/components/Detail/DetailUnCap";
import DetailChangeTool from "@/pages/Flow/components/Detail/DetailChangeTool";
import DetailPickTip from "@/pages/Flow/components/Detail/DetailPickTip";
import DetailTrnsLiquid from "@/pages/Flow/components/Detail/DetailTrnsLiquid";
import DetailMvSolid from "@/pages/Flow/components/Detail/DetailMvSolid";
import DetailPeristaltic from "@/pages/Flow/components/Detail/DetailPeristaltic";
import DetailMix3 from "@/pages/Flow/components/Detail/DetailMix3";

interface IProps {
  flowItem: Flows.FlowDataItem<any>;

  [key: string]: any;
}

const getFlowName = (action: string): string => {
  return MethodsMap.find(item => item.name === action)?.label || '';
};
const FlowDetailItem: React.FC<IProps> = (props) => {
  const { flowItem } = props;
  console.log(flowItem);
  return (
    <Card size={"small"} title={`${getFlowName(flowItem.action)} - ${flowItem.action}`}>
      {/*先决条件*/}
      <DetailPrerequisite prerequisite={flowItem.prerequisite}/>
      <br/>

      {/*读值*/}
      {
        flowItem.action === 'read' &&
        <DetailRead
          data={flowItem as Flows.FlowDataItem<Methods.Read>}
        />
      }

      {/*写值*/}
      {
        flowItem.action === 'write' &&
        <DetailWrite
          data={flowItem as Flows.FlowDataItem<Methods.Write>}
        />
      }
      {/*等待*/}
      {
        flowItem.action === 'sleep' &&
        <DetailSleep
          data={flowItem as Flows.FlowDataItem<Methods.Sleep>}
        />
      }
      {/*移动*/}
      {
        flowItem.action === 'methdMvThing' &&
        <DetailMove
          data={flowItem as Flows.FlowDataItem<Methods.MethodMvThing>}
        />
      }

      {/*加固*/}
      {
        flowItem.action === 'methdDoAddSolid' &&
        <DetailAddSolid
          data={flowItem as Flows.FlowDataItem<Methods.AddSolid>}
        />
      }


      {/*加液*/}
      {
        flowItem.action === 'methdAddSol' &&
        <DetailAddSol
          data={flowItem as Flows.FlowDataItem<Methods.AddSol>}
        />
      }

      {/*开盖*/}
      {
        flowItem.action === 'methdUncap' &&
        <DetailUnCap
          data={flowItem as Flows.FlowDataItem<Methods.UnCap>}
        />
      }

      {/*开盖*/}
      {
        flowItem.action === 'methdRecap' &&
        <DetailUnCap
          data={flowItem as Flows.FlowDataItem<Methods.ReCap>}
        />
      }


      {/*更换夹爪*/}
      {
        flowItem.action === 'methdChngTool' &&
        <DetailChangeTool
          data={flowItem as Flows.FlowDataItem<Methods.ChangeTool>}
        />
      }

      {/*抬起枪头*/}
      {
        flowItem.action === 'methdPickTip' &&
        <DetailPickTip
          data={flowItem as Flows.FlowDataItem<Methods.PickTip>}
        />
      }

      {/*移动液体*/}
      {
        flowItem.action === 'methdTrnsLiquid' &&
        <DetailTrnsLiquid
          data={flowItem as Flows.FlowDataItem<Methods.TrnsLiquid>}
        />
      }


      {/*移动固体料仓*/}
      {
        flowItem.action === 'methdMvSolid' &&
        <DetailMvSolid
          data={flowItem as Flows.FlowDataItem<Methods.MvSolid>}
        />
      }

      {/*移动固体料仓*/}
      {
        flowItem.action === 'methdDoPeristaltic' &&
        <DetailPeristaltic
          data={flowItem as Flows.FlowDataItem<Methods.Peristaltic>}
        />
      }

      {/*搅拌3*/}
      {
        flowItem.action === 'methdDoMix3' &&
        <DetailMix3
          data={flowItem as Flows.FlowDataItem<Methods.Mix3>}
        />
      }


      {/*废液蒸馏*/}
      {
        flowItem.action === 'methdDoMix3' &&
        <DetailMix3
          data={flowItem as Flows.FlowDataItem<Methods.Mix3>}
        />
      }




    </Card>
  );
};

export default FlowDetailItem;
