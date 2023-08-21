import { CenterHolderStyle } from '@/utils';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  loading?: boolean;
  deleteReagent: (item: API.Trays.positions) => void;
  bindReagent: (item: API.Trays.positions) => void;
  trays: API.Trays.positions[];

  [key: string]: any;
}

const TraysArea: React.FC<IProps> = (props) => {
  const { loading = true, trays, bindReagent, deleteReagent } = props;
  const maxCol = Math.max(...trays.map((item) => item.x));
  const TraysAreaWarp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .trays {
      display: grid;
      justify
      grid-template-columns: repeat(${maxCol}, 120px);
      gap: 20px;
      align-items: center;
      justify-items: center;
      min-height: 400px;

      .trayItem {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        overflow: hidden;
        background-color: #ecf5ff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  `;
  return (
    <Card>
      <TraysAreaWarp>
        {/*{ loading && <div className="loging"><Spin tip={'loading'}/></div> }*/}

        <div className="trays">
          {trays.length === 0 && (
            <CenterHolderStyle style={{ height: '400px' }}>
              <Empty />
            </CenterHolderStyle>
          )}
          {trays.map((item) => {
            return (
              <div className={'trayItem'} key={item.id}>
                <div>
                  <div>
                    {item.reagent_name || '暂无试剂'}
                    <br />
                    {item.quantity} {item.unit}
                    <br />
                    <Tooltip title="删除工作区">
                      <Button
                        type={'link'}
                        style={{ color: 'red' }}
                        icon={<DeleteOutlined />}
                        onClick={() => deleteReagent(item)}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="绑定试剂">
                      <Button
                        type={'link'}
                        icon={<PlusOutlined />}
                        onClick={() => bindReagent(item)}
                      ></Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </TraysAreaWarp>
    </Card>
  );
};

export default TraysArea;
