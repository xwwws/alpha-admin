import { getAreasMap, getMethodsMap, getStepsMap } from '@/api/public';
import { ITypes } from '@/pages/typings';
import { GET_TOKEN } from '@/utils/auth';
import { useCallback, useEffect, useState } from 'react';

export default function useExperimentModel() {
  /**
   * 获取步骤
   */
  const [steps, setSteps] = useState<ITypes.EnumType[]>([]);
  const initSteps = useCallback(async () => {
    const { data } = await getStepsMap();
    setSteps(data.map((item): ITypes.EnumType => ({ label: item.label, value: item.name })));
  }, []);

  /**
   * 获取methods
   */
  const [methods, setMethods] = useState<ITypes.EnumType[]>([]);
  const initMethods = useCallback(async () => {
    const { data } = await getMethodsMap();
    setMethods(data.map((item): ITypes.EnumType => ({ label: item.label, value: item.name })));
  }, []);

  /**
   * 获取areas
   */
  const [areas, setAreas] = useState<ITypes.EnumType[]>([]);
  const initAreas = useCallback(async () => {
    const { data } = await getAreasMap();
    setAreas(data.map((item): ITypes.EnumType => ({ label: item.label, value: item.name })));
  }, []);

  useEffect(() => {
    if (GET_TOKEN()) {
      if (steps.length === 0) initSteps();
      if (methods.length === 0) initMethods();
      if (areas.length === 0) initAreas();
    }
  }, [steps, methods, areas]);
  return {
    // steps 相关
    steps,
    initSteps,
    // methods 相关
    methods,
    initMethods,
    // areas 相关
    areas,
    initAreas,
  };
}
