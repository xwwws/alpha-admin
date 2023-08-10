import { getStepsMap } from '@/api/public';
import { useCallback, useEffect, useState } from 'react';

export default function useExperimentModel() {
  /**
   * 获取步骤
   */
  const [stepsMap, setStepsMap] = useState<any[]>([]);
  const initStepsMap = useCallback(async () => {
    console.log(`request steps Map `);
    const res = await getStepsMap();
    setStepsMap(res);
  }, []);
  useEffect(() => {
    // 没有步骤信息的话请求步骤信息
    if (stepsMap?.length === 0) initStepsMap();
  }, [stepsMap]);
  return {
    // 步骤相关
    stepsMap,
    initStepsMap,
  };
}
