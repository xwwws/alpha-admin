# 智成平台

该项目是基于 [antd-pro](https://pro.ant.design/zh-CN/docs/getting-started/) 开发

主要技术栈:

- react
- umi
- css-in-js: styled-components
- style 也可使用 less

## git 代码提交规范:

<style>
.important{
  font-size: 12px;
  color: red; 
  font-weight: 900;
}
</style>
<p  class="important"> 代码提交强制使用以下规则,  本项目已经安装husky, 请规范使用 </p>

| type | 作用 |
| --- | --- |
| feat | 新增特性(feature) |
| fix | 修复 bug(feature) |
| docs | 修改文档(documentation) |
| style | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor) |
| perf | 改善性能(A code change that improves performance) |
| test | 测试(when adding missing tests) |
| build | 变更项目构建或外部依赖 (例如 scopes: webpack、gulp、npm 等) |
| ci | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore | 变更构建流程或辅助工具(比如更改测试环境) |
| revert | 代码回退 |

## 环境变量

**_: `/config/config._**.ts`

```javascript
{
...
  define: {
    'process.env'
  :
    {
      API_SERVER: 'http://10.0.0.33:9000',
        ENV
    :
      'dev',
    }
  ,
  }
...
}

```

`package.json` 中 `script`配置

```shell
cross-env UMI_ENV=*** max dev
```

文件中访问:

```javascript
console.log(process.env.API_SERVER); // http://10.0.0.33:9000
```

## !!!暂未解决问题

- [x] ~~已解决~~
- [ ] 未解决

- [x] ~~可能由于 react he antd 版本不匹配问题 ts 会经常报错 请暂时使用 `// ts-ignore` 编辑器不报错 后续调整~~
