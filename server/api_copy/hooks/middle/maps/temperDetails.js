/**
 * 获取所有病人的信息
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Report/GetTempDetails',

  // 参数映射关系
  map: {
    reportId: 'REPORT_ID',
    patientId: 'PATIENT_ID', // 病人id
    visitId: 'VISIT_ID',
    date: 'RECORD_DATE', // 查询日期
    time: 'TIME_POINT', // 查询时间
  }
};

