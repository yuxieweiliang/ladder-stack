/**
 * 获取所有病人的信息
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Report/GetDetailsByReportid',

  // 参数映射关系
  map: {
    reportType: 'REPORT_TYPE', // 页面类型
    patientId: 'patient_id', // 病人id
    visitId: 'visit_id',
    recordId: 'RECORD_ID',
  }
};
// 示例
// REPORT_TYPE=2
// RECORD_ID=10386932
// patient_id=10153554
// visit_id=4