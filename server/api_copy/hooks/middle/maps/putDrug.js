/**
 * 摆药
 */

module.exports = {

  // 请求方式
  method: 'GET',

  // 服务端的action
  action: 'Common/GetOrderDetailsData',

  // 参数映射关系
  map: {
    patientId: 'PationtID', // 病人id
    visitID: 'VisitID',
    startDate: 'StartDate', // 时间
    orderType: 'OrderType', // 单子种类
    termType: 'administration', // 期限类型
    execType: 'Exec_Flag' // 是否已执行 3,4全部 3已执行 4未执行
  }
};
