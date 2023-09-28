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

  /**
   * method相关
   */


  declare namespace Methods {
    enum MethodAction {
      READ = 'read',
      SLEEP = 'sleep',
      METHD_MV_THING = 'methdMvThing',
      METHD_ADD_SOL = 'methdAddSol',
      METHD_UN_CAP = 'methdUncap',
      METHD_RE_CAP = 'methdRecap',
      METHD_CHNG_TOOL = 'methdChngTool',
      METHD_PICK_TIP = 'methdPickTip',
      METHD_TRNS_LIQUID = 'methdTrnsLiquid',
      METHD_GET_PADDLE = 'methdGetPaddle',
      METHD_PUT_PADDLE = 'methdPutPaddle',
      METHD_DO_MIX2 = 'methdDoMix2',
      METHD_MV_SOLID = 'methdMvSolid',
      METHD_DO_ADD_SOLID = 'methdDoAddSolid',
      METHD_DO_PERISTALTIC = 'methdDoPeristaltic',
      METHD_DO_MIX3 = 'methdDoMix3',
    }

    interface GetMethodHisByMethodReq extends PagesReq {
    }

    interface MethodHis {
      id: number;
      start_time: string;
      end_time: string;
      action: string;
      label: string;
      args: (string | number)[];
      result: string[];
    }
  }
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
    src_area?: Coordinates; // 不会出现
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
   * Steps
   */
  declare namespace Steps {
    interface getMethodsByStepId {
      id: number | string;
      start_time: string;
      end_time: string;
      action: string;
      label: string;
      args: (string | number)[];
      result: string[];
    }

    enum StepName {
      ADD_SOLVENT_STEP = 'add_solvent_step',
      ADD_SOLID_STEP = 'add_solid_step',
      PIPETTE_STEP = 'pipette_step',
      DO_PERISTALTIC_STEP = 'do_peristaltic_step',
      HEATING_STIR_STEP = 'heating_stir_step',
    }

    interface GetStepHisReq extends PagesReq {
    }

    interface StepHis {
      id: number;
      start_time: string;
      end_time: string;
      expt_id: number;
      reagent_id: number;
      reagent_name: string;
      status: string;
      content: AddSolid | Pipette | AddSolvent | Mix3Step | DoPeristalticStep;
      result: string[];
      name: string;
      label: string;
      quantity_plan: number;
      quantity_real: number;
    }
  }


  /**
   * experiments 相关
   */
  declare namespace Experiments {
    type List = {
      bottle_area: Coordinates;
      bottle_height: number;
      created_at: string;
      id: string | number;
      name: string;
      status: string;
    };

    interface DataAcquisitionsResults {
      name: string;
      nodeid: number;
      interval: number;
      value_type: string;
      file_url: string;
    }

    interface data_acquisitionParams {
      nodeid: string | number;
      interval: number;
    }

    type ExperimentDetailsRes = {
      id: string | number;
      project_id: string | number;
      name: string;
      bottle_area: Coordinates;
      bottle_height: 0;
      steps_data: CreateExperimentStep[];
      status: string;
      data_acquisitions: data_acquisitionParams[];
      data_acquisitions_results: DataAcquisitionsResults[]
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

    type ExperimentStepsRes = {
      id: string | number;
      start_time: string
      end_time: string
      expt_id: number
      reagent_id: number
      status: string
      content: {
        speed: string | number;
        weight: string | number;
        accuracy: string | number;
        dst_area: Coordinates;
        src_area: Coordinates;
      }
      result: string[]
      name: string
      label: string
      quantity_plan: number
      quantity_real: number
      data_acquisitions: data_acquisitionParams[]
      data_acquisitions_results: DataAcquisitionsResults[]

    };

    //  实验状态
    interface ExperimentStatus {
      status: 'draft' |
        'waiting' |
        'doing' |
        'succeed' |
        'failed' |
        'canceled';
    }

    // 创建实验步骤
    interface CreateExperimentStep {
      name: string;
      data_acquisitions?: IAcquisitions[];
      reagent_id?: string | number;
      kwargs: AddSolid & Pipette & AddSolvent & Mix3Step & DoPeristalticStep;
    }

    interface IAcquisitions {
      nodeid: string | number;
      interval: string | number;

    }

    // 创建实验
    interface CreateExperimentReq {
      name: string;
      project_id: string | number;
      bottle_area: Coordinates;
      bottle_height: string | number;
      data_acquisitions?: IAcquisitions[];
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
   * project 相关
   */
  declare namespace Projects {
    interface ListReq extends PagesReq {

    }

    interface List {
      id: number;
      name: string;
      description: string;
      created_at: string;
      updated_at: string;
    }

    interface CreateProject {
      name: string;
      description: string;
    }

    interface EditProject extends CreateProject {
      id?: string | number;
    }

    interface ProjectDetail {
      id: string | number;
      name: string;
      description: string;
      created_at: string;
      updated_at: string;
    }
  }


  /**
   * 用户相关
   */
  type UserLoginReq = {
    username: string;
    passwd: string;
  };

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
