// @ts-ignore
/* eslint-disable */

declare namespace API {
  interface PagesReq {
    limit?: string | number;
    page?: string | number;
  }

  interface PagesRes<T> {
    total: number;
    currentPage: number;
    data: T[];
  }

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
    src_area: Coordinates;
    dst_area: Coordinates;
    height: string | number;
  };
  // 加液
  type AddSolReq = {
    src_area: Coordinates;
    dst_area: Coordinates;
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
    tip_area: Coordinates;
    tip_length: number;
    drop_pre: boolean;
  };
  // 移液
  type LiquidMovementReq = {
    src_area: Coordinates;
    dst_area: Coordinates;
    tip_length: number | string;
    total: number | string;
    take_once: number | string;
    spit_once: number | string;
    interval: number | string;
    speed: number | string;
  };
  // 移动固体料仓
  type SolidMovementReq = {
    src_area: Coordinates;
    dst_area: Coordinates;
    height: number | string;
  };
  // 搅拌加固
  type doAddSolidReq = {
    area_name: string;
    speed: number | string;
    angel: number | string;
    weight: number | string;
    tolerance: number | string;
  };
  /**
   * steps相关
   */
  // 添加溶剂
  type AddSolvent = {
    src_area: Coordinates;
    dst_area: Coordinates;
    speed: string | number;
    weight: string | number;
    accuracy: string | number;
  };
  // 移液
  type Pipette = {
    src_area: Coordinates;
    dst_area: Coordinates;
    speed: string | number;
    total: string | number;
    take_once: string | number;
    spit_once: string | number;
    interval: string | number;
    height: string | number;
    tip_length: string | number;
  };
  // 添加固体
  type AddSolid = {
    src_area: Coordinates;
    dst_area: Coordinates;
    speed: string | number;
    height: string | number;
    angel: string | number;
    weight: string | number;
    tolerance: string | number;
  };
  /**
   * experiments 相关
   */
  declare namespace Experiments {
    type List = {
      bottle_area: {
        name: string;
        x: number;
        y: number;
        z: number;
      };
      bottle_height: number;
      created_at: string;
      id: string | number;
      name: string;
      status: string;
    };

    type ExperimentRecordRes = {
      id: string | number;
      name: string;
      bottle_area: Coordinates;
      bottle_height: 0;
      steps_data: CreateExperimentStep[];
      status: string;
    };

    //  实验状态
    interface ExperimentStatus {
      status: 'draft' | 'waiting' | 'doing' | 'succeed' | 'failed' | 'canceled';
    }

    // 创建实验步骤
    interface CreateExperimentStep {
      name: string;
      kwargs: AddSolid | Pipette | AddSolvent;
    }

    // 创建实验
    interface CreateExperimentReq {
      name: string;
      bottle_area: Coordinates;
      bottle_height: string | number;
      steps_data: CreateExperimentStep[];
    }

    interface CreateExperimentRes extends CreateExperimentReq, ExperimentStatus {
      id: string | number;
    }
  }

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
    avatar: string;
  };
  LoginResult;
  type LogoutReq = {};
}
