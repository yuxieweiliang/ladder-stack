/**
 * 查询教育列表
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Nurse/GetHealthRecordList',

  // 参数映射关系
  map: {
    patientId: 'patientid',
    visitId: 'visitid',
    startTime: 'starttime',
    endTime: 'endtime',
  }
};
// patientid=10153554
// visitid=4
// starttime=2016-06-07%2011:26
// endtime=2017-06-07%2011:26