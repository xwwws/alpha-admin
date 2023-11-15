
declare namespace Steps {
  /**
   * 行星搅拌
   */
  // 搅拌3
  type Mix3PlanetStep = {
    dst_area?: Coordinates;
    src_area?: Coordinates; // 不会出现
    time?: string | number;
    data_acquisitions?: data_acquisitionParams[];
  };
  /**
   * 废液蒸馏
   */
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
    data_acquisitions?: API.data_acquisitionParams[];
  }

}
