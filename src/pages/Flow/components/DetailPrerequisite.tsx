import React from 'react';
import styled from "styled-components";

interface IProps {
  prerequisite: Flows.Iprerequisite;

  [key: string]: any;
}

const DetailPrerequisiteStyle = styled.div`
  display: flex;

  .title {
    width: 100px;
    text-indent: 1em;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    flex: 1;
  }
`;

const DetailPrerequisite: React.FC<IProps> = (props) => {
  const { prerequisite } = props;
  return (
    <DetailPrerequisiteStyle>
      <div className="title">
        先决条件
      </div>
      <div className="content">
        <span>nodeid: {prerequisite.nodeid}</span>
        <br/>
        <span>operator: {prerequisite.operator} </span>
        <br/>
        <span>value: {`${prerequisite.value === undefined ? '' : prerequisite.value}`} </span>
      </div>
    </DetailPrerequisiteStyle>
  );
};

export default DetailPrerequisite;
