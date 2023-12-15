const parsePrerequisite = (item: any) => {
  if (
    item.prerequisite_nodeid &&
    item.prerequisite_operator &&
    item.prerequisite_value
  ) {
    return {
      nodeid: item.prerequisite_nodeid,
      operator: item.prerequisite_operator,
      value: item.prerequisite_value,
    };
  } else {
    return {};
  }
};
export const fmtFlowRequestParams = (value: any) => {
  const params: any = {
    name: value.name,
    description: value.description,
    data_acquisitions: value.data_acquisitions,
    project_id: value.project_id,
    flow_data: []
  };

  value.flow_data.forEach((item: any) => {
    switch (item.action) {
      // 读值
      case 'read':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            nodeid: item.nodeid
          }
        });
        break;
      //   写值
      case 'write':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            nodeid: item.nodeid,
            node_value: item.node_value
          }
        });
        break;
      //   等待
      case 'sleep':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            seconds: item.seconds
          }
        });
        break;
      //   移动
      case 'methdMvThing':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z
            },
            height: item.height
          }
        });
        break;
      //   加液
      case 'methdAddSol':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z
            },
            speed: item.speed,
            weight: item.weight,
            accuracy: item.accuracy
          }
        });
        break;
      //   开瓶器位开盖
      case 'methdUncap':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            area_name: item.area_name,
            y: item.y,
            height: item.height
          }
        });
        break;
      //   开瓶器位开盖
      case 'methdRecap':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            area_name: item.area_name,
            y: item.y,
            height: item.height
          }
        });
        break;
      //   开瓶器位开盖
      case 'methdChngTool':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            src_tool: item.src_tool,
            dst_tool: item.dst_tool,
          }
        });
        break;
      //   开瓶器位开盖
      case 'methdPickTip':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            tip_area: {
              name: item.tip_area_name,
              x: item.tip_area_x,
              y: item.tip_area_y,
              z: item.tip_area_z,
            },
            tip_length: item.tip_length,
            drop_pre: item.drop_pre,
          }
        });
        break;
      //   开瓶器工位吸液，滴加位吐液  /  移液
      case 'methdTrnsLiquid':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z
            },
            tip_length: item.tip_length,
            total: item.total,
            take_once: item.take_once,
            spit_once: item.spit_once,
            interval: item.interval,
            speed: item.speed,
          }
        });
        break;
      //   移固体料仓
      case 'methdMvSolid':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            src_area: {
              name: item.src_area_name,
              x: item.src_area_x,
              y: item.src_area_y,
              z: item.src_area_z
            },
            dst_area: {
              name: item.dst_area_name,
              x: item.dst_area_x,
              y: item.dst_area_y,
              z: item.dst_area_z
            },
            height: item.height
          }
        });
        break;
      //   加固启动
      case 'methdDoAddSolid':
        params.flow_data.push({
          action: item.action,
          prerequisite: parsePrerequisite(item),
          kwargs: {
            area_name: item.area_name,
            speed: item.speed,
            angel: item.angel,
            weight: item.weight,
            tolerance: item.tolerance,
          }
        });
        break;
      default:

    }
  });
  return params;
};