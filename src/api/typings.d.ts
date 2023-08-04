// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Pages = {
    limit?: string | number;
    page?: string | number;
  };

  /**
   * method相关
   */
  // 读值
  type ReadReq = {
    node_index: string | number;
  };
  // 等待
  type sleepReq = {
    seconds: string | number;
  };
  // 操作响应
  type MethodsRes = {
    start_time: string;
    end_time: string;
    result: string[];
  };
  // 坐标类型
  type Coordinates = {
    name: string;
    x: string | number;
    y: string | number;
    z: string | number;
  };
  // 移动
  type MoveReq = {
    src_area: MoveParams;
    dst_area: MoveParams;
    height: string | number;
  };
  // 加液
  type AddSolReq = {
    src_area: MoveParams;
    dst_area: MoveParams;
    speed: string | number;
    weight: string | number;
    accuracy: string | number;
  };
  // 开盖
  type OpenCap = {
    area_name: string;
    y: string | number;
    height: string | number;
  };
  // 加盖
  type CloseCap = {
    area_name: string;
    y: string | number;
    height: string | number;
  };
  // 更换夹爪
  type ClawGripper = {
    dst_tool: string;
    src_tool: string;
  };
  // 抬起枪头
  type PickTipReq = {
    tip_area: MoveParams;
    tip_length: number;
    drop_pre: boolean;
  };

  // 移液
  type LiquidMovementReq = {
    src_area: MoveParams;
    tip_length: number | string;
    dst_area: MoveParams;
    total: number | string;
    take_once: number | string;
    spit_once: number | string;
    interval: number | string;
    speed: number | string;
  };

  /**
   * 用户相关
   */
  type UserLoginReq = {
    username: string;
    password: string;
  };
  interface response<T> {
    status: 'ok' | 'err';
    code: number;
    data: T;
  }
  interface UserLoginRes {
    token: string;
  }

  type UserInfoRes = {
    username: string;
  };
}
