/**
 * 获取steps
 * @param data
 */
export const getStepsMap = (data?: object | undefined) => {
  return Promise.resolve([
    { label: '添加溶剂', value: 'add_solvent_step' },
    { label: '移液', value: 'pipette_step' },
    { label: '加固', value: 'add_solid_step' },
  ]);
  // return request<boolean>(`/api/v1/expt/expts/${id}/run`, {
  //   method: 'post',
  //   data,
  // });
};
