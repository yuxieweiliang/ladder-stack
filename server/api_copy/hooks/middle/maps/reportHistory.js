/**
 * 获取所有病人的信息
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Report/GetHistoryRiskReport',

  // 参数映射关系
  map: {
    pageName: 'THEME_CODE', // 页面名称
    patientId: 'PATIENT_ID', // 病人id
    visitId: 'VISIT_ID',
    reportId: 'report_id',
    startTime: 'starttime', // 开始时间
    endTime: 'endtime', // 结束时间
  }
};

// 示例
// REPORT_TYPE=2
// PATIENT_ID=10153554
// VISIT_ID=4
// THEME_CODE=%E5%8E%8B%E7%96%AE%E5%8D%B1%E9%99%A9%E5%9B%A0%E7%B4%A0%E8%AF%84%E4%BC%B0%E8%A1%A8    （base:64 -> 压疮危险因素评估表）
// report_id=10522132
// starttime=2014/1/7 10:23:00
// endtime=July/17/27 04:yy:22