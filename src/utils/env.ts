/**
 * @description:  根据定义的属性返回封装的环境变量
 */
function wrapperEnvFn() {
  const env = import.meta.env
  const ret: any = {}
  return function () {
    for (const envName of Object.keys(env)) {
      let realName = env[envName]
      realName = realName === 'true' ? true : realName === 'false' ? false : realName
      //启动端口
      if (envName === 'VITE_PORT') {
        realName = Number(realName)
      }
      ret[envName] = realName
    }
    return ret
  }
}

export const wrapperEnv = wrapperEnvFn()()
