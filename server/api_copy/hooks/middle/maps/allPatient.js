/**
 * 获取所有病人的信息
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'PatientAbout/getAllPatsInHospital',

  // 参数映射关系
  map: {
    // 用户名
    deptCode: 'Dept_Code'
  }
};
