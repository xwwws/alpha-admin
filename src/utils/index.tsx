import styled from 'styled-components';

/**
 * form 基础配置
 */
export const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // label 允许换行
  labelWrap: true,
  // 不需要冒号
  colon: false,
};
export const CenterHolderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
