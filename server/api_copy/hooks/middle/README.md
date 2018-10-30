# 智慧医疗信息平台【NodeJS中间服务】
  > 西安康恩电子科技有限功能

## 前端开发组

  > 查询所有患者信息：
  ### allPatient
    {
      deptCode: 'deptCode',
    }

  > 查询医嘱执行列表：
  ### doctorAsk
    {
      patientId: '病人id',
      visitID,
      startDate, // 时间
      orderType, // 单子种类
      termType, // 期限类型
      execType // 是否已执行 3,4全部 3已执行 4未执行
    }

  > 查询教育分类：
  ### educationCategory
    {
      parentId: '病人id',
      nursingUnit
    }

  > 查询教育列表：
  ### educationList
    {
      classId: '类型', // 病人id
      patientId: '病人id',
      visitId: 'visitid',
      startTime: '开始时间',
      endTime: '结束时间',
    }

  > 查询教育列表：
  ### educationRecordList
    {
      patientId: 'patientid',
      visitId: 'visitid',
      startTime: 'starttime',
      endTime: 'endtime',
    }

  > 保存教育记录：
  ### educationSave
    {
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

  > 查询教育类型：
  ### educationType
    {
      parentId: 'parent_id', // 病人id
      nursingUnit: 'nursing_unit',
    }

  > 查询教育类型：
  ### inspectDetails
    {
      patientId: 'PationtID', // 病人id
      visitId: 'VisitID',
      startDate: 'startDate',
    }

  > 配药：
  ### joinDrug
    {
      patientId: 'PationtID', // 病人id
      visitID: 'VisitID',
      startDate: 'StartDate', // 时间
      orderType: 'OrderType', // 单子种类
      termType: 'administration', // 期限类型
      execType: 'Exec_Flag' // 是否已执行 3,4全部 3已执行 4未执行
    }

  > 摆药：
  ### putDrug
    {
      patientId: 'PationtID', // 病人id
      visitID: 'VisitID',
      startDate: 'StartDate', // 时间
      orderType: 'OrderType', // 单子种类
      termType: 'administration', // 期限类型
      execType: 'Exec_Flag' // 是否已执行 3,4全部 3已执行 4未执行
    }

  > 首页病人卡片下的四个按钮：
  ### quickMenu
    {}

  > 复合页面详细内容：
  ### reportDetails
    {
      reportType: 'REPORT_TYPE', // 页面类型
      patientId: 'patient_id', // 病人id
      visitId: 'visit_id',
      recordId: 'RECORD_ID',
    }

  > 复合页面历史记录：
  ### reportHistory
    {
      pageName: 'THEME_CODE', // 页面名称
      patientId: 'PATIENT_ID', // 病人id
      visitId: 'VISIT_ID',
      reportId: 'report_id',
      startTime: 'starttime', // 开始时间
      endTime: 'endtime', // 结束时间
    }

  > 登录：
  ### signIn
    {
      username: 'loginname',// 用户名
      password: 'psw'// 密码
    }

  > 体温单 -> 详情：
  ### temperDetails
    {
      reportId: 'REPORT_ID',
      patientId: 'PATIENT_ID', // 病人id
      visitId: 'VISIT_ID',
      date: 'RECORD_DATE', // 查询日期
      time: 'TIME_POINT', // 查询时间
    }

  > 体温单历史记录：
  ### temperHostory
    {}


  > 病人治疗项目列表：
  ### treatDetailed
    {
      orderId: 'id', // 查询的治疗项目的id
      patientId: 'pid', // 病人id
      visitID: 'vid',
    }

  > 病人治疗项目列表：
  ### treatOrder
    {
      treatOrder
    }

  > 用户信息：
  ### userInfo
    {}
