import path from 'path';

/**
 * 应用系统配置文件路径列表(别名->路径)，
 * 别名指导入别名，如: import appConfig from 'appConfig';
 * 路径指相对于src/config文件夹的路径
 */
const appConfigFiles = {
  config: 'jsconfig/jsconfig.json5',
};


/**
 * 获取配置文件导入别名信息，用在webpack->resolve->alias
 */
export function getAppConfigAliasInfo() {
  let aliasInfo = {};
  let isProd = process.env.NODE_ENV === 'production';
  for (let key in appConfigFiles) {
    let relativePath = appConfigFiles[key];
    let folder = relativePath.substr(0, relativePath.lastIndexOf('/'));
    aliasInfo[key] = isProd
      ? path.join(__dirname, '..', `src/config/${folder}`)
      : path.join(__dirname, '..', `src/config/${relativePath}`);
  }
  return aliasInfo;
}

/**
 * 获取配置文件打包复制信息，用在webpack->plugins->CopyWebpackPlugin
 */
export function getAppConfigCopyInfo() {
  let copyInfo = [];
  for (let key in appConfigFiles) {
    let relativePath = appConfigFiles[key];
    let fileName = relativePath.substr(relativePath.lastIndexOf('/') + 1);
    copyInfo.push({
      src: path.resolve(__dirname, `../src/config/${relativePath}`),
      dest: `dist/config/`,
    });
  }
  return copyInfo;
}