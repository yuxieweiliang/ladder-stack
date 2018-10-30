/**
 * 查询教育列表
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Nurse/SaveHealthRecord',

  // 参数映射关系
  map: {
    classId: 'classid',
    patientId: 'PationtID',
    visitId: 'VisitID',
    itemsId: 'itemids',
    confNurse: 'confrmNurse',
    eduObj: 'EDU_OBJ',
    eduFrom: 'EDU_FROM',
    eduResult: 'EDU_RESULT',
    createTime: 'CREATE_TIME',
  }
};

// classid=10439529
// EDU_OBJ=%E7%97%85%E4%BA%BA  -> 病人
// EDU_FROM=%E5%8F%A3%E8%BF%B0  -> 口述
// EDU_RESULT=%E8%83%BD%E4%BA%86%E8%A7%A3  -> 能了解
// CREATE_TIME=2017-07-27%2017:05
// PationtID=10153554
// VisitID=4
// itemids=10439530,
// confrmNurse=
