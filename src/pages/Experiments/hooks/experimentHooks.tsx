/**
 * 格式化采集数据
 * @param arr
 */
// const getDataAcquisitions = (arr: ()[]): API.Experiments.IAcquisitions[] => {
//   arr = arr || [];
//   return arr.map(item => ({
//     nodeid: item,
//     interval: Number(interval) > 0 ? interval : 1
//   }));
// };
/**
 * 将表单数据格式化为创建实验参数
 * @param values
 * @return {API.Experiments.CreateExperimentReq}
 */
export const fmtRequestParams = (values: any): API.Experiments.CreateExperimentReq => {
  console.log(values);
  const params: API.Experiments.CreateExperimentReq = {
    name: values.name,
    project_id: values.project_id,
    bottle_height: values.bottle_height,
    data_acquisitions: values.data_acquisitions,
    bottle_area: {
      name: values.bottle_area_name,
      x: values.bottle_area_x,
      y: values.bottle_area_y,
      z: values.bottle_area_z,
    },
    recycle_area: {
      name: values.recycle_area_name,
      x: values.recycle_area_x,
      y: values.recycle_area_y,
      z: values.recycle_area_z,
    },
    steps_data: [],
  };
  // 根据不同情况处理不同数据
  // TODO 优化代码 看起来不这么多
  values.steps_data.forEach((item: any) => {
    switch (item.step_name) {
      case 'add_solvent_step':
        params.steps_data.push({
          reagent_id: item.reagent_id,
          name: item.step_name,
          data_acquisitions: item.data_acquisitions,
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z,
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z,
            },
            speed: item.speed,
            weight: item.weight,
            accuracy: item.accuracy,
          },
        });
        break;
      case 'pipette_step':
        params.steps_data.push({
          reagent_id: item.reagent_id,
          name: item.step_name,
          data_acquisitions: item.data_acquisitions,
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z,
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z,
            },
            speed: item.speed,
            total: item.total,
            take_once: item.take_once,
            spit_once: item.spit_once,
            interval: item.interval,
            height: item.height,
            tip_length: item.tip_length,
          },
        });
        break;
      case 'add_solid_step':
        params.steps_data.push({
          reagent_id: item.reagent_id,
          name: item.step_name,
          data_acquisitions: item.data_acquisitions,
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z,
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z,
            },
            speed: item.speed,
            weight: item.weight,
            angel: item.angel,
            tolerance: item.tolerance,
            height: item.height,
          },
        });
        break;
      //   蠕动泵加液
      case 'do_peristaltic_step':
        params.steps_data.push({
          reagent_id: item.reagent_id,
          name: item.step_name,
          data_acquisitions: item.data_acquisitions,
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z,
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z,
            },
            speed: item.speed,
            weight: item.weight,
            accuracy: item.accuracy,
          },
        });
        break;
      //   加热搅拌
      case 'heating_stir_step':
        params.steps_data.push({
          name: item.step_name,
          data_acquisitions: item.data_acquisitions,
          kwargs: {
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z,
            },
            time: item.time,
          },
        });
        break;
    }
  });
  return params;
};

/**
 *  将后台实验数据格式化为form所需数据
 * @param data
 */
export const fmtResToFormData = (data: API.Experiments.CreateExperimentReq): any => {
  const steps_data = data.steps_data.map(item => {
    const steps_data_item: any = {
      step_name: item.name,
      reagent_id: item.reagent_id || undefined,

    };
    switch (item.name) {
      case 'add_solvent_step':
        steps_data_item.src_area_name = `${item.kwargs.src_area?.name}`;
        steps_data_item.src_area_x = `${item.kwargs.src_area?.x}`;
        steps_data_item.src_area_y = `${item.kwargs.src_area?.y}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.dst_area_name = `${item.kwargs.dst_area?.name}`;
        steps_data_item.dst_area_x = `${item.kwargs.dst_area?.x}`;
        steps_data_item.dst_area_y = `${item.kwargs.dst_area?.y}`;
        steps_data_item.dst_area_z = `${item.kwargs.dst_area?.z}`;
        steps_data_item.speed = `${item.kwargs.speed}`;
        steps_data_item.weight = `${item.kwargs.weight}`;
        steps_data_item.accuracy = `${item.kwargs.accuracy}`;
        steps_data_item.data_acquisitions = item.data_acquisitions;
        break;
      case 'pipette_step':
        steps_data_item.src_area_name = `${item.kwargs.src_area?.name}`;
        steps_data_item.src_area_x = `${item.kwargs.src_area?.x}`;
        steps_data_item.src_area_y = `${item.kwargs.src_area?.y}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.dst_area_name = `${item.kwargs.dst_area?.name}`;
        steps_data_item.dst_area_x = `${item.kwargs.dst_area?.x}`;
        steps_data_item.dst_area_y = `${item.kwargs.dst_area?.y}`;
        steps_data_item.dst_area_z = `${item.kwargs.dst_area?.z}`;
        steps_data_item.speed = `${item.kwargs.speed}`;
        steps_data_item.total = `${item.kwargs.total}`;
        steps_data_item.take_once = `${item.kwargs.take_once}`;
        steps_data_item.spit_once = `${item.kwargs.spit_once}`;
        steps_data_item.interval = `${item.kwargs.interval}`;
        steps_data_item.height = `${item.kwargs.height}`;
        steps_data_item.tip_length = `${item.kwargs.tip_length}`;
        steps_data_item.data_acquisitions = item.data_acquisitions;
        break;
      case 'add_solid_step':
        steps_data_item.src_area_name = `${item.kwargs.src_area?.name}`;
        steps_data_item.src_area_x = `${item.kwargs.src_area?.x}`;
        steps_data_item.src_area_y = `${item.kwargs.src_area?.y}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.dst_area_name = `${item.kwargs.dst_area?.name}`;
        steps_data_item.dst_area_x = `${item.kwargs.dst_area?.x}`;
        steps_data_item.dst_area_y = `${item.kwargs.dst_area?.y}`;
        steps_data_item.dst_area_z = `${item.kwargs.dst_area?.z}`;
        steps_data_item.speed = `${item.kwargs.speed}`;
        steps_data_item.weight = `${item.kwargs.weight}`;
        steps_data_item.angel = `${item.kwargs.angel}`;
        steps_data_item.tolerance = `${item.kwargs.tolerance}`;
        steps_data_item.height = `${item.kwargs.height}`;
        steps_data_item.data_acquisitions = item.data_acquisitions;
        break;
      //   蠕动泵加液
      case 'do_peristaltic_step':
        steps_data_item.src_area_name = `${item.kwargs.src_area?.name}`;
        steps_data_item.src_area_x = `${item.kwargs.src_area?.x}`;
        steps_data_item.src_area_y = `${item.kwargs.src_area?.y}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.src_area_z = `${item.kwargs.src_area?.z}`;
        steps_data_item.dst_area_name = `${item.kwargs.dst_area?.name}`;
        steps_data_item.dst_area_x = `${item.kwargs.dst_area?.x}`;
        steps_data_item.dst_area_y = `${item.kwargs.dst_area?.y}`;
        steps_data_item.dst_area_z = `${item.kwargs.dst_area?.z}`;
        steps_data_item.speed = `${item.kwargs.speed}`;
        steps_data_item.weight = `${item.kwargs.weight}`;
        steps_data_item.accuracy = `${item.kwargs.accuracy}`;
        steps_data_item.data_acquisitions = item.data_acquisitions;
        break;
      //   加热搅拌
      case 'heating_stir_step':
        steps_data_item.dst_area_name = `${item.kwargs.dst_area?.name}`;
        steps_data_item.dst_area_x = `${item.kwargs.dst_area?.x}`;
        steps_data_item.dst_area_y = `${item.kwargs.dst_area?.y}`;
        steps_data_item.dst_area_z = `${item.kwargs.dst_area?.z}`;
        steps_data_item.time = `${item.kwargs.time}`;
        steps_data_item.data_acquisitions = item.data_acquisitions;
        break;
    }

    return steps_data_item;
  });
  return {
    name: data.name,
    project_id: `${data.project_id}`,
    bottle_area_name: data.bottle_area.name,
    bottle_area_x: `${data.bottle_area.x}`,
    bottle_area_y: `${data.bottle_area.y}`,
    bottle_area_z: `${data.bottle_area.z}`,
    bottle_height: `${data.bottle_height}`,
    data_acquisitions: data.data_acquisitions,
    steps_data
  };
};
