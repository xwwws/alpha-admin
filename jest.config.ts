import { configUmiAlias, createConfig } from 'umi/test';

export default async () => {
  const config = await configUmiAlias({
    ...createConfig({
      target: 'browser',
    }),
  });
  console.log(JSON.stringify(config));

  return {
    ...config,
    testEnvironmentOptions: {
      ...(config?.testEnvironmentOptions || {}),
      url: 'http://localhost:8000',
    },
    setupFiles: [...(config.setupFiles || []), './tests/setupTests.jsx'],
    globals: {
      ...config.globals,
      localStorage: null,
    },
  };
};
