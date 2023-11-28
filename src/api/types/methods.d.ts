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
  interface sleepReq {
    seconds: string | number;
  }

  interface Dodistillc3 {
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
