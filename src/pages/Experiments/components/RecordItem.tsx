import DetailAddSolid from '@/pages/Experiments/components/DetailAddSolid';
import DetailAddSolvent from '@/pages/Experiments/components/DetailAddSolvent';
import DetailDoPeristaltic from '@/pages/Experiments/components/DetailDoPeristaltic';
import DetailMix3 from '@/pages/Experiments/components/DetailMix3';
import DetailPipette from '@/pages/Experiments/components/DetailPipette';
import React from 'react';
import styled from 'styled-components';

import { Descriptions, DescriptionsProps } from 'antd';
interface IProps {
  record: Experiments.CreateExperimentStep;
}

const RecordItemStyle = styled.div`
  display: grid;
  gap: 10px;
  padding: 15px;
`;
const RecordItem: React.FC<IProps> = (props) => {
  const { record } = props;
  const descriptionInfo: DescriptionsProps[`items`] = [
    {
      key: 'collectedData-1',
      label: '采集数据',
      children: (
        <div>
          {/* @ts-ignore*/}
          {record?.data_acquisitions?.map((item,index) => (
            <p key={index}>nodeid: {item.nodeid} interval: {item.interval}</p>
          ))}
        </div>
      ),
    },
  ];
  return (
    <RecordItemStyle>
      {/*添加溶剂*/}
      {record.name === 'add_solvent_step' && <DetailAddSolvent record={record} />}
      {/*加液*/}
      {record.name === 'pipette_step' && <DetailPipette record={record} />}
      {/*加固*/}
      {record.name === 'add_solid_step' && <DetailAddSolid record={record} />}
      {/*蠕动泵加液*/}
      {record.name === 'do_peristaltic_step' && <DetailDoPeristaltic record={record} />}
      {/*搅拌3*/}
      {record.name === 'heating_stir_step' && <DetailMix3 record={record} />}


      <Descriptions
        bordered
        column={4}
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        items={descriptionInfo}
      />
    </RecordItemStyle>
  );
};
export default RecordItem;
