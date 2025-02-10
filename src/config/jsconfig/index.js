import ConfigLoader from '../../utils/config-loader';
//应用程序配置
let config;
try {
  config = ConfigLoader.readAndConvertSync('./config/jsconfig.json5');
} catch (e) {
}

export default config;
