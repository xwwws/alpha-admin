declare namespace Methods {
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

  interface Write {
    node_index: number | string;
    node_value: number | string;
  }

}
