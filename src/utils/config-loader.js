import JSON5 from 'json5';
import axios from 'axios';

/**
 * 配置加载器，支持同步或异步的配置读取和配置转换(json、xml、yml)
 */
class ConfigLoader {
  //配置缓存
  static configCaches = {};

  //格式转换器
  static converters = {
    json: data => {
      return typeof data === 'string' ? JSON.parse(data) : data;
    },
    json5: data => {
      return JSON5.parse(data);
    },
  };

  /**
   * 异步读取配置文件
   * @param {String} filePath 配置文件地址
   */
  static async readAsync(filePath) {
    let path = `${filePath}?_=${new Date().getTime()}`;
    return new Promise((resolve, reject) => {
      if (!this.configCaches[filePath]) {
        axios
          .get(path)
          .then(p => {
            if (p.data) {
              this.configCaches[filePath] = p.data;
            }
            resolve(p.data);
          })
          .catch(e => {
            reject(e);
          });
      } else {
        resolve(this.configCaches[filePath]);
      }
    });
  }

  /**
   * 同步读取配置文件
   * @param {String} filePath 配置文件地址
   * @param {opts} 配置信息
   * opts.xmlRoot xml文件的根节点名，仅xml有效，移除掉xml根节点
   * opts.conclusionType 是否类型推断转换，仅xml有效，设置为true则会将xml中推断为Boolean或Number的字符串转为对应类型
   */
  static readSync(filePath) {
    let path = `${filePath}?_=${new Date().getTime()}`;
    let xhr = new XMLHttpRequest();
    let data = null;
    xhr.open('GET', path, false);
    xhr.onload = () => {
      data = xhr.responseText;
      this.configCaches[filePath] = data;
    };
    xhr.onerror = () => {
      throw new Error(`${xhr.status}: ${xhr.statusText}`);
    };
    xhr.ontimeout = () => {
      throw new Error(`${xhr.status}: ${xhr.statusText}`);
    };
    xhr.send();
    return data;
  }

  /**
   * 异步读取配置文件并转换为JSON对象(支持json、xml、yml格式)
   * @param {String} filePath 配置文件地址
   * @param {opts} 配置信息
   * opts.xmlRoot xml文件的根节点名，仅xml有效，移除掉xml根节点
   * opts.conclusionType 是否类型推断转换，仅xml有效，设置为true则会将xml中推断为Boolean或Number的字符串转为对应类型
   */
  static async readAndConvertAsync(filePath, opts) {
    let options = Object.assign({ conclusionType: true, xmlRoot: 'root' }, opts);
    return new Promise((resolve, reject) => {
      this.readAsync(filePath)
        .then(async data => {
          let fileExt = filePath.substr(filePath.lastIndexOf('.') + 1);
          let parser = this.converters[fileExt];
          if (!parser) {
            reject('格式无法解析，未找到加载器！');
            return;
          }
          try {
            let result = parser(data, options);
            resolve(result);
          } catch (e) {
            reject(`配置文件解析失败，${e}`);
          }
        })
        .catch(e => {
          reject(`配置文件获取失败，${e}`);
        });
    });
  }

  /**
   * 同步读取配置文件并转换为JSON对象(支持json、xml、yml格式)
   * @param {String} filePath 配置文件地址
   * @param {opts} 配置信息
   * opts.conclusionType 是否类型推断转换，仅xml有效，设置为true则会将xml中推断为Boolean或Number的字符串转为对应类型
   */
  static readAndConvertSync(filePath, opts) {
    let options = Object.assign({ conclusionType: true, xmlRoot: 'root' }, opts);
    let data = this.readSync(filePath);
    let fileExt = filePath.substr(filePath.lastIndexOf('.') + 1);
    let parser = this.converters[fileExt];
    if (!parser) {
      throw new Error('格式无法解析，未找到加载器！');
    }
    let result = null;
    try {
      result = parser(data, options);
    } catch (e) {
      throw new Error(`配置文件解析失败，${e}`);
    }
    return result;
  }
}

export default ConfigLoader;
