/**
 * 病人治疗项目列表
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Common/GetPatientExamDayModel',

  // 参数映射关系
  map: {
    patientId: 'PationtID', // 病人id
    visitId: 'VisitID',
    startDate: 'startDate',
  }
};

// PationtID=10153554
// VisitID=4
// startDate=2017.06.05