/**
 * 病人治疗项目列表
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'QualityCheck/GetOrderSettingList',

  // 参数映射关系
  map: {
    deptId: 'deptid', // 病人id
  }
};

