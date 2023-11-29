/**
 * 本文件定义的methods类型大多适用于工作流中的methods
 */
declare namespace Methods {
  // 读值
  interface Read {
    nodeid: number | string;
  }

  // 写值
  interface Write {
    node_index: number | string;
    nodeid?: number | string;
    node_value: number | string;
  }

//   等待
  interface Sleep {
    seconds: string | number;
  }

  // 移动
  interface MethodMvThing {
    dst_x: string | number;
    dst_y: string | number;
    dst_z: string | number;
    src_x: string | number;
    src_y: string | number;
    src_z: string | number;
    height: string | number;
    dst_area: string;
    src_area: string;
  }

  // 加固
  interface AddSolidReq {
    area_name: string;
    speed: string | number;
    angel: string | number;
    weight: string | number;
    tolerance: string | number;
  }

  interface AddSolid {
    angel: string | number;
    speed: string | number;
    weight: string | number;
    area_name: string;
    tolerance: string | number;
  }

  // 加液
  interface AddSol {
    dst_x: string | number;
    dst_y: string | number;
    dst_z: string | number;
    speed: string | number;
    src_x: string | number;
    src_y: string | number;
    src_z: string | number;
    weight: string | number;
    accuracy: string | number;
    dst_area: string;
    src_area: string;
  }

  // 开盖
  interface UnCap {
    y: string | number;
    height: string | number;
    area_name: string;
  }

  // 加盖
  interface ReCap {
    y: string | number;
    height: string | number;
    area_name: string;
  }


  // 加盖
  interface ChangeTool {
    dst_tool: string;
    src_tool: string;
  }


  // 抬起枪头
  interface PickTip {
    x: string | number;
    y: string | number;
    z: string | number;
    drop_pre: boolean;
    tip_length: string | number;
    tip_area_name: string;
  }

  // 移液
  interface TrnsLiquid {
    speed: string | number;
    src_x: string | number;
    total: string | number;
    interval: string | number;
    spit_once: string | number;
    take_once: string | number;
    tip_length: string | number;
    dst_area_name: string;
    src_area_name: string;
  }


  // 移动固体料仓
  interface MvSolid {
    dst_x: string | number;
    dst_y: string | number;
    dst_z: string | number;
    src_x: string | number;
    src_y: string | number;
    src_z: string | number;
    height: string | number;
    dst_area_name: string;
    src_area_name: string;
  }

  // 蠕动泵加液
  interface Peristaltic {
    speed: string | number;
    src_x: string | number;
    src_y: string | number;
    src_z: string | number;
    weight: string | number;
    accuracy: string | number;
    src_area_name: string;
  }

  // 搅拌3
  interface Mix3 {
    time: string | number;
    area_name: string;
  }

  interface Distillc3 {
    fbpTemp: string | number;
    ibpTemp: string | number;
    stirRPM: string | number;
    coolerSy: string | number;
    src_area: string;
    stirMode: string | number;
    stirTemp: string | number;
    washTime: string | number;
    cleanTime: string | number;
    suplyTime: string | number;
    totalTime: string | number;
    heatBandsy: string | number;

  }

  interface DoDistillc3Req {
    area_name: string;
    cooler_sy: number | string;
    heat_band_sy: number | string;
    stir_temp: number | string;
    ibp_temp: number | string;
    fbp_temp: number | string;
    stir_mode: number | string;
    stir_rpm: number | string;
    wash_time: number | string;
    clean_time: number | string;
    suply_time: number | string;
    total_time: number | string;
  }
}
