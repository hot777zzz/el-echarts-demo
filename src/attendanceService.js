// 组织树静态数据
// orgType: 1=项目，2=标段，3=驻点
// id: 唯一标识
// pid: 父级ID，0表示顶级
// name: 组织名称
// idx: 同级排序序号
const orgData = [
  { id: '1', pid: '0', name: '省级项目', orgType: 1, idx: 0 },
  { id: '10001', pid: '1', name: '子项目 1', orgType: 1, idx: 0 },
  { id: '10002', pid: '1', name: '项目 1', orgType: 1, idx: 1 },
  { id: '10003', pid: '1', name: '项目 2', orgType: 1, idx: 2 },
  { id: '10004', pid: '1', name: '项目 3', orgType: 1, idx: 3 },
  { id: '100010001', pid: '10001', name: '标段 1', orgType: 2, idx: 0 },
  { id: '100010002', pid: '10001', name: '标段 2', orgType: 2, idx: 1 },
  { id: '100010003', pid: '10001', name: '标段 3', orgType: 2, idx: 2 },
  { id: '1000100030001', pid: '100010003', name: '驻点 1', orgType: 3, idx: 0 },
  { id: '1000100030002', pid: '100010003', name: '驻点 2', orgType: 3, idx: 0 },
  { id: '100030001', pid: '10003', name: '标段 4', orgType: 2, idx: 0 },
  { id: '100030002', pid: '10003', name: '标段 5', orgType: 2, idx: 1 },
  { id: '1000300020001', pid: '100030002', name: '驻点 3', orgType: 3, idx: 0 },
  { id: '1000300020002', pid: '100030002', name: '驻点 4', orgType: 3, idx: 1 },
  { id: '100040001', pid: '10004', name: '标段 6', orgType: 2, idx: 0 },
  { id: '1000400010001', pid: '100040001', name: '驻点 5', orgType: 3, idx: 0 },
  { id: '1000400010002', pid: '100040001', name: '驻点 6', orgType: 3, idx: 1 }
];

// 考勤记录静态数据
// id: 记录ID
// userId: 用户ID
// userName: 用户姓名
// orgId: 所属驻点ID
// realTime: 考勤日期
// time: 打卡时间，null表示未打卡，即缺勤
const attendanceData = [
  { id: 1, userId: '1213123', userName: '张山', orgId: '1000100030001', realTime: '2024-09-29', time: '2024-09-29 09:00:00' },
  { id: 2, userId: '321342345', userName: '张山一', orgId: '1000100030001', realTime: '2024-09-29', time: '2024-09-29 08:00:00' },
  { id: 3, userId: '23123123', userName: '张山三', orgId: '1000100030002', realTime: '2024-09-29', time: '2024-09-29 10:00:00' },
  { id: 4, userId: '2312312', userName: '张山四', orgId: '1000100030002', realTime: '2024-09-29', time: null },
  { id: 5, userId: '111111', userName: '李四', orgId: '1000300020001', realTime: '2024-09-29', time: '2024-09-29 08:30:00' },
  { id: 6, userId: '222222', userName: '王五', orgId: '1000300020001', realTime: '2024-09-29', time: '2024-09-29 09:15:00' },
  { id: 7, userId: '333333', userName: '赵六', orgId: '1000300020002', realTime: '2024-09-29', time: '2024-09-29 08:45:00' },
  { id: 8, userId: '444444', userName: '孙七', orgId: '1000300020002', realTime: '2024-09-29', time: null },
  { id: 9, userId: '555555', userName: '周八', orgId: '1000400010001', realTime: '2024-09-29', time: '2024-09-29 08:15:00' },
  { id: 10, userId: '666666', userName: '吴九', orgId: '1000400010001', realTime: '2024-09-29', time: '2024-09-29 09:30:00' },
  { id: 11, userId: '777777', userName: '郑十', orgId: '1000400010002', realTime: '2024-09-29', time: '2024-09-29 08:50:00' },
  { id: 12, userId: '888888', userName: '冯十一', orgId: '1000400010002', realTime: '2024-09-29', time: null },
  { id: 13, userId: '999999', userName: '钱十二', orgId: '1000100030001', realTime: '2024-09-29', time: '2024-09-29 08:40:00' },
  { id: 14, userId: '101010', userName: '孙十三', orgId: '1000100030001', realTime: '2024-09-29', time: '2024-09-29 09:30:00' },
  { id: 15, userId: '110110', userName: '李十四', orgId: '1000100030002', realTime: '2024-09-29', time: '2024-09-29 08:55:00' },
  { id: 16, userId: '120120', userName: '王十五', orgId: '1000100030002', realTime: '2024-09-29', time: null },
  { id: 17, userId: '130130', userName: '赵十六', orgId: '1000300020001', realTime: '2024-09-29', time: '2024-09-29 09:20:00' },
  { id: 18, userId: '140140', userName: '刘十七', orgId: '1000300020001', realTime: '2024-09-29', time: '2024-09-29 08:05:00' },
  { id: 19, userId: '150150', userName: '陈十八', orgId: '1000300020002', realTime: '2024-09-29', time: '2024-09-29 09:05:00' },
  { id: 20, userId: '160160', userName: '杨十九', orgId: '1000300020002', realTime: '2024-09-29', time: null },
  { id: 21, userId: '170170', userName: '黄二十', orgId: '1000400010001', realTime: '2024-09-29', time: '2024-09-29 08:35:00' },
  { id: 22, userId: '180180', userName: '周二十一', orgId: '1000400010001', realTime: '2024-09-29', time: '2024-09-29 09:45:00' },
  { id: 23, userId: '190190', userName: '吴二十二', orgId: '1000400010002', realTime: '2024-09-29', time: '2024-09-29 08:20:00' },
  { id: 24, userId: '200200', userName: '郑二十三', orgId: '1000400010002', realTime: '2024-09-29', time: null },
  { id: 25, userId: '210210', userName: '冯二十四', orgId: '1000100030001', realTime: '2024-09-29', time: '2024-09-29 08:10:00' },
  { id: 26, userId: '220220', userName: '蒋二十五', orgId: '1000100030001', realTime: '2024-09-29', time: '2024-09-29 09:50:00' },
  { id: 27, userId: '230230', userName: '沈二十六', orgId: '1000100030002', realTime: '2024-09-29', time: '2024-09-29 09:00:00' },
  { id: 28, userId: '240240', userName: '韩二十七', orgId: '1000100030002', realTime: '2024-09-29', time: null },
  { id: 29, userId: '250250', userName: '杨二十八', orgId: '1000300020001', realTime: '2024-09-29', time: '2024-09-29 08:25:00' },
  { id: 30, userId: '260260', userName: '朱二十九', orgId: '1000300020001', realTime: '2024-09-29', time: '2024-09-29 09:10:00' },
  { id: 31, userId: '270270', userName: '秦三十', orgId: '1000300020002', realTime: '2024-09-29', time: '2024-09-29 08:50:00' },
  { id: 32, userId: '280280', userName: '尤三十一', orgId: '1000300020002', realTime: '2024-09-29', time: null },
  { id: 33, userId: '290290', userName: '许三十二', orgId: '1000400010001', realTime: '2024-09-29', time: '2024-09-29 08:40:00' },
  { id: 34, userId: '300300', userName: '何三十三', orgId: '1000400010001', realTime: '2024-09-29', time: '2024-09-29 09:35:00' },
  { id: 35, userId: '310310', userName: '吕三十四', orgId: '1000400010002', realTime: '2024-09-29', time: '2024-09-29 08:15:00' },
  { id: 36, userId: '320320', userName: '施三十五', orgId: '1000400010002', realTime: '2024-09-29', time: null },
  { id: 37, userId: '320321', userName: '施三十六', orgId: '1000400010002', realTime: '2024-09-29', time: null }
];

