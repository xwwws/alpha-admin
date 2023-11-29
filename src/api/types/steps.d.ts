declare namespace Steps {
  /**
   * 行星搅拌
   */
  type Mix3PlanetStep = {
    dst_area?: API.Coordinates;
    src_area?: API.Coordinates;
    time?: string | number;
    data_acquisitions?: API.data_acquisitionParams[];
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

  /**
   * 步骤调用历史指令信息
   */
  type StepHisInfo = {
    id: number;
    start_time: string;
    end_time: string;
    expt_id: number;
    expt_name: string;
    reagent_id: number;
    reagent_name: string;
    status: string;
    content: string;
    result: string[];
    name: string;
    label: string;
    quantity_plan: string;
    quantity_real: string;
    duration: 0;
    data_acquisitions: API.data_acquisitionParams[];
    data_acquisitions_results: API.DataAcquisitionsResults[];
    attachments: any[];
  }

}
