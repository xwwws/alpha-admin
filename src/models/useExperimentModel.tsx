import { getMethodsMap, getStepsMap } from '@/api/public';
import { useCallback, useEffect, useState } from 'react';

export default function useExperimentModel() {
  /**
   * 获取步骤
   */
  const [steps, setSteps] = useState<any[]>([]);
  const initSteps = useCallback(async () => {
    const res = await getStepsMap();
    setSteps(res.map((item) => ({ label: item.label, value: item.name })));
  }, []);

  /**
   * 获取methods
   */
  const [methods, setMethods] = useState<any[]>([]);
  const initMethods = useCallback(async () => {
    const res = await getMethodsMap();
    setMethods(res.map((item) => ({ label: item.label, value: item.name })));
  }, []);
  useEffect(() => {
    if (steps.length === 0) initSteps();
    if (methods.length === 0) initMethods();
  }, [steps, methods]);
  return {
    // steps 相关
    steps,
    initSteps,
    // methods 相关
    methods,
    initMethods,
  };
}
