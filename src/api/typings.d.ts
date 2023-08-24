declare interface Response<T> {
  code: number;
  data: T;
  msg: string;
}

declare namespace API {
  interface PagesReq {
    page_size?: string | number;
    page?: string | number;
  }
  interface PagesRes<T> {
    data: T[];
    total: number;
    total_pages: number;
    page: number;
    page_size: number;
  }
  interface Enum {
    name: string;
    label: string;
  }
  interface Area_Enum extends Enum {
    area_type: string;
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

  // 蠕动泵加液
  type DoPeristaltic = {
    src_area: Coordinates;
    speed?: string | number;
    weight?: string | number;
    accuracy?: string | number;
  };
  // 搅拌3
  type Mix3 = {
    area_name: string;
    time: string | number;
  };
  /**
   * steps相关
   */
  // 添加溶剂
  type AddSolvent = {
    src_area?: Coordinates;
    dst_area?: Coordinates;
    speed?: string | number;
    weight?: string | number;
    accuracy?: string | number;
  };
  // 移液
  type Pipette = {
    src_area?: Coordinates;
    dst_area?: Coordinates;
    speed?: string | number;
    total?: string | number;
    take_once?: string | number;
    spit_once?: string | number;
    interval?: string | number;
    height?: string | number;
    tip_length?: string | number;
  };
  // 添加固体
  type AddSolid = {
    src_area?: Coordinates;
    dst_area?: Coordinates;
    speed?: string | number;
    height?: string | number;
    angel?: string | number;
    weight?: string | number;
    tolerance?: string | number;
  };

  // 蠕动泵加液
  type DoPeristalticStep = {
    src_area?: Coordinates;
    dst_area?: Coordinates;
    speed?: string | number;
    weight?: string | number;
    accuracy?: string | number;
  };

  // 搅拌3
  type Mix3Step = {
    dst_area?: Coordinates;
    time?: string | number;
  };

  type ReagentsInfo = {
    id: number;
    area_name: string;
    area_type: string;
    x: string | number;
    y: string | number;
    z: string | number;
    reagent_id: string | number;
    reagent_name: string;
    quantity: string | number;
    unit: string;
    created_at: string;
    updated_at: string;
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

    type ExperimentDetailsRes = {
      id: string | number;
      name: string;
      bottle_area: Coordinates;
      bottle_height: 0;
      steps_data: CreateExperimentStep[];
      status: string;
    };

    type ExperimentRecordRes = {
      id: string | number;
      action: string;
      args: string[];
      start_time: string;
      end_time: string;
      label: string;
      result: any[];
    };

    //  实验状态
    interface ExperimentStatus {
      status: 'draft' | 'waiting' | 'doing' | 'succeed' | 'failed' | 'canceled';
    }
    // 创建实验步骤
    interface CreateExperimentStep {
      name: string;
      reagent_id?: string | number;
      kwargs: AddSolid & Pipette & AddSolvent & Mix3Step & DoPeristalticStep;
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
   * reagents 试剂相关
   */
  declare namespace Reagents {
    type List = {
      id: number;
      number: number;
      deputy_number: number;
      name: string;
      cas: string;
      solute_molecular_weight: string;
      solvent: string;
      solution_density: string;
      concentration: string;
      boiling_point: string;
      melting_point: string;
      preparation_time: string;
      created_at: string;
      updated_at: string;
    };
    type Create = {
      number: string | number;
      deputy_number: string | number;
      name: string;
      cas: string;
      solute_molecular_weight: string | number;
      solvent: string;
      solution_density: string | number;
      concentration: string | number;
      boiling_point: string | number;
      melting_point: string | number;
      preparation_time: string;
    };
  }

  /**
   * Trays 托盘相关
   */
  declare namespace Trays {
    type positions = {
      id: number;
      area_name: string;
      area_type: string;
      x: number;
      y: number;
      z: number;
      reagent_id: number;
      reagent_name: string;
      quantity: string;
      unit: string;
      created_at: string;
      updated_at: string;
    };
    type CreateReq = {
      area_name: string;
      area_type: string;
      x: 0;
      y: 0;
      z: 0;
      reagent_id: 0;
      quantity: 0;
      unit: string;
    };
  }
  /**
   * 用户相关
   */
  type UserLoginReq = {
    username: string;
    passwd: string;
  };

  interface response<T> {
    code: number;
    msg: string;
    data: T;
  }

  interface UserLoginRes {
    token: string;
    username: string;
  }

  type UserInfoRes = {
    username: string;
    avatar: string;
  };
  interface LogoutReq {
    [key: any]: any;
  }
}
