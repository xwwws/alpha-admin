import React from 'react';

import DetailRead from "@/pages/Flow/components/DetailRead";
import DetailWrite from "@/pages/Flow/components/DetailWrite";
import DetailMove from "@/pages/Flow/components/DetailMove";
import DetailSleep from "@/pages/Flow/components/DetailSleep";
import DetailAddSolid from "@/pages/Flow/components/DetailAddSolid";
import DetailAddSol from "@/pages/Flow/components/DetailAddSol";
import DetailUnCap from "@/pages/Flow/components/DetailUnCap";
import DetailChangeTool from "@/pages/Flow/components/DetailChangeTool";
import DetailPickTip from "@/pages/Flow/components/DetailPickTip";
import DetailTrnsLiquid from "@/pages/Flow/components/DetailTrnsLiquid";
import DetailMvSolid from "@/pages/Flow/components/DetailMvSolid";
import DetailPeristaltic from "@/pages/Flow/components/DetailPeristaltic";
import DetailMix3 from "@/pages/Flow/components/DetailMix3";
import DetailDistillC3 from "@/pages/Flow/components/DetailDistillC3";

interface IProps {
  action: string;
  data: Methods.Read |
    Methods.Write |
    Methods.Sleep |
    Methods.MethodMvThing |
    Methods.AddSol |
    Methods.AddSolid |
    Methods.UnCap |
    Methods.ChangeTool |
    Methods.PickTip |
    Methods.TrnsLiquid |
    Methods.MvSolid |
    Methods.Peristaltic |
    Methods.Mix3 |
    Methods.Distillc3;

  [key: string]: any;
}

const DetailItem: React.FC<IProps> = (props) => {
  const { action, data } = props;
  return (
    <>

      {/*读值*/}
      {
        action === 'read' &&
        <DetailRead
          data={data as Methods.Read}
        />
      }

      {/*写值*/}
      {
        action === 'write' &&
        <DetailWrite
          data={data as Methods.Write}
        />
      }

      {/*等待*/}
      {
        action === 'sleep' &&
        <DetailSleep
          data={data as Methods.Sleep}
        />
      }

      {/*移动*/}
      {
        action === 'methdMvThing' &&
        <DetailMove
          data={data as Methods.MethodMvThing}
        />
      }

      {/*加固*/}
      {
        action === 'methdDoAddSolid' &&
        <DetailAddSolid
          data={data as Methods.AddSolid}
        />
      }


      {/*加液*/}
      {
        action === 'methdAddSol' &&
        <DetailAddSol
          data={data as Methods.AddSol}
        />
      }

      {/*开盖*/}
      {
        action === 'methdUncap' &&
        <DetailUnCap
          data={data as Methods.UnCap}
        />
      }

      {/*开盖*/}
      {
        action === 'methdRecap' &&
        <DetailUnCap
          data={data as Methods.ReCap}
        />
      }


      {/*更换夹爪*/}
      {
        action === 'methdChngTool' &&
        <DetailChangeTool
          data={data as Methods.ChangeTool}
        />
      }

      {/*抬起枪头*/}
      {
        action === 'methdPickTip' &&
        <DetailPickTip
          data={data as Methods.PickTip}
        />
      }

      {/*移动液体*/}
      {
        action === 'methdTrnsLiquid' &&
        <DetailTrnsLiquid
          data={data as Methods.TrnsLiquid}
        />
      }


      {/*移动固体料仓*/}
      {
        action === 'methdMvSolid' &&
        <DetailMvSolid
          data={data as Methods.MvSolid}
        />
      }

      {/* 蠕动泵加液*/}
      {
        action === 'methdDoPeristaltic' &&
        <DetailPeristaltic
          data={data as Methods.Peristaltic}
        />
      }

      {/*搅拌3*/}
      {
        action === 'methdDoMix3' &&
        <DetailMix3
          data={data as Methods.Mix3}
        />
      }


      {/*废液蒸馏*/}
      {
        action === 'methdDoDistillC3' &&
        <DetailDistillC3
          data={data as Methods.Distillc3}
        />
      }

    </>
  );
};

export default DetailItem;
