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
          action: 'read',
          prerequisite: parsePrerequisite(item),
          kwargs: {
            nodeid: item.nodeid
          }
        });
        break;
      //   写值
      case 'write':
        params.flow_data.push({
          action: 'write',
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
          action: 'sleep',
          prerequisite: parsePrerequisite(item),
          kwargs: {
            seconds: item.seconds
          }
        });
        break;
      //   移动
      case 'methdMvThing':
        params.flow_data.push({
          action: 'methdMvThing',
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
          action: 'methdAddSol',
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
          action: 'methdUncap',
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
          action: 'methdUncap',
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
          action: 'methdChngTool',
          prerequisite: parsePrerequisite(item),
          kwargs: {
            src_tool: item.src_tool,
            dst_tool: item.dst_tool,
          }
        });
        break;
      default:

    }
  });
  return params;
};