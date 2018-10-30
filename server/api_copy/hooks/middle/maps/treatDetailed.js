/**
 * 病人治疗项目列表
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'QualityCheck/GetPatientAnnounceOrderList',

  // 参数映射关系
  map: {
    orderId: 'id', // 查询的治疗项目的id
    patientId: 'pid', // 病人id
    visitID: 'vid',
  }
};