import DetailAddSolid from '@/pages/Experiments/components/DetailAddSolid';
import DetailAddSolvent from '@/pages/Experiments/components/DetailAddSolvent';
import DetailPipette from '@/pages/Experiments/components/DetailPipette';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  record: API.Experiments.CreateExperimentStep;
}

const RecordItemStyle = styled.div`
  padding: 15px;
`;
const RecordItem: React.FC<IProps> = (props) => {
  const { record } = props;
  return (
    <RecordItemStyle>
      {/*添加溶剂*/}
      {record.name === 'add_solvent_step' && <DetailAddSolvent record={record} />}
      {/*加液*/}
      {record.name === 'pipette_step' && <DetailPipette record={record} />}
      {/*加固*/}
      {record.name === 'add_solid_step' && <DetailAddSolid record={record} />}
    </RecordItemStyle>
  );
};
export default RecordItem;
