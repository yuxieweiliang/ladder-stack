/**
 * 查询教育列表
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Nurse/GetListDetailsByClassID',

  // 参数映射关系
  map: {
    classId: 'classid', // 病人id
    patientId: 'patientid',
    visitId: 'visitid',
    startTime: 'starttime',
    endTime: 'endtime',
  }
};

// classid=10439529
// patientid=10153554
// visitid=4
// starttime=2016-06-07%2011:26
// endtime=2017-06-07%2011:26