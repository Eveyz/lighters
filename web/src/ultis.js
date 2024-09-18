export const getToken = () => {
  let token = localStorage.getItem("jwtToken");
  if(!token || token === "") {//if there is no token, dont bother
    return null;
  }
  return token;
}

export const fetchFromArr = (id, arr) => {
  for(var item in arr) {
    if(item._id === id) {
      return item;
    }
  }
  return null;
}

export const saveToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (e) {
    throw e;
  }
}

export const loadFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    throw e;
  }
}

export const groupBooks = (books) => {
  var groupBooks = {};

  // group books by category
  books.forEach(function(book) {
    if(!(book.category in groupBooks)) {
      groupBooks[book.category] = [];
    }
    groupBooks[book.category].push(book);
  });

  // group books by serials name
  var serialsBooks;
  for(var category in groupBooks) {
    serialsBooks = {};
    if (groupBooks.hasOwnProperty(category)) {
      for(var book in groupBooks[category]) {
        var serialsName = book.serials;
        if(!(serialsName in serialsBooks)) {
          serialsBooks[serialsName] = [];
        }
        serialsBooks[serialsName].push(book);
      }
      groupBooks[category] = serialsBooks;
    }
  }
  return { groupedBooks: groupBooks, categories: Object.keys(groupBooks) };
}

export const TZDateToDate = (TZDate) => {
  let date = new Date(Date.parse(TZDate));
  return date;
}

export const getFullMinutes = (date) => {
  return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

export const getFullDate = (date) => {
  const [_year, _month, _day] = date.split("-")
  let month = (parseInt(_month, 10) < 10 ? '0' : '') + _month
  let day = (parseInt(_day, 10) < 10 ? '0' : '') + _day
  return `${_year}-${month}-${day}`
}

export const getToday = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd < 10) {
    dd = '0' + dd
  }
  if(mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy;
  return today
}

export const sortReportsByDate = (reports) => {
  if(!reports) return []
  let results = reports.sort((a, b) => b.course_date.localeCompare(a.course_date))
  return results
}

export const sortTransactionsByDate = (transactions) => {
  if(!transactions) return []
  let results = transactions.sort((b, a) => a.created_at.localeCompare(b.created_at))
  return results
}

// only for display teacher paycheck usage only
export const getReportCredit = (situation) => {
  let res;
  switch(situation) {
    case ("正常上课"):
    case ("平台赠课或一对一学员特殊情况首次缺课"):
    case ("学员上课时间后才请假或无故缺课(1个课时费)"):
    case ("学员迟到(不必补全课时, 可按时下课, 1个课时费)"):
    case ("老师迟到早退10分钟以内(需免费于当堂或下堂课补全课时才可得1个课时费, 但会影响薪资晋级)"):
    case ("代课(1个课时费)"):
    case ("小组课单个学员首次请假(学员付0.5课时费观看上课录屏, 老师照旧获1课时费)"):
    case ("小组课单个学员非首次请假(学员付1课时费观看上课录屏, 老师获1课时费)"):
      res = 1;
      break;
    case ("学员开课前2小时内才请假(0.5个课时费)"):
    case ("老师无故迟到10分钟以上20分钟以内并且课程依旧进行(0.5个课时费)"):
      res = 0.5;
      break;
    case ("老师无故迟到并且取消课程(0个课时费, 需免费补课一节)"):
    case ("免费补课(0个课时费)"):
    case ("试课"):
      res = 0;
      break;
    default:
      res = 0;
      break;
  }
  return res;
}

export const getStudentReportCredit = (situation) => {
  let res;
  switch(situation) {
    case ("正常上课"):
    case ("学员上课时间后才请假或无故缺课(1个课时费)"):
    case ("学员迟到(不必补全课时, 可按时下课, 1个课时费)"):
    case ("老师迟到早退10分钟以内(需免费于当堂或下堂课补全课时才可得1个课时费, 但会影响薪资晋级)"):
    case ("代课(1个课时费)"):
    case ("小组课单个学员非首次请假(学员付1课时费观看上课录屏, 老师获1课时费)"):
      res = 1;
      break;
    case ("学员开课前2小时内才请假(0.5个课时费)"):
    case ("老师无故迟到10分钟以上20分钟以内并且课程依旧进行(0.5个课时费)"):
    case ("小组课单个学员首次请假(学员付0.5课时费观看上课录屏, 老师照旧获1课时费)"):
      res = 0.5;
      break;
    case ("平台赠课或一对一学员特殊情况首次缺课"):
    case ("老师无故迟到并且取消课程(0个课时费, 需免费补课一节)"):
    case ("免费补课(0个课时费)"):
    case ("试课"):
      res = 0;
      break;
    default:
      res = 0;
      break;
  }
  return res;
}

export const getLocalTime = (date) => {
  var d = new Date(date)
  return `${d.toLocaleDateString()}-${d.toLocaleTimeString('en-US', { hour12: false })}`
}

export const getLocalDate = (date) => {
  var d = new Date(date)
  return `${d.toLocaleDateString()}`
}

export const getLocalDateFormat = (date) => {
  return date ? date.split('T')[0] : ""
}

export const ACTIONS = Object.freeze({ "NEW": 1, "EDIT": 2 })

export const CLASS_TYPE = ["一对一", "一对二", "一对三", "一对四", "一对五"]

export const CLASS_TYPE_RANK = {
  "一对一": 0, 
  "一对二": 1, 
  "一对三": 2, 
  "一对四": 3, 
  "一对五": 4,
}

export const CLASS_LEVEL = ["启蒙", "起步", "初级上", "初级下", "中级上", "中级下", "中高级", "高级"]

export const CLASS_LEVEL_RANK = {
  "启蒙": 0, 
  "起步": 1, 
  "初级上": 2, 
  "初级下": 3, 
  "中级上": 4, 
  "中级下": 5, 
  "中高级": 6, 
  "高级": 7
}

export const TEACHER_LEVEL = ["1级", "2级", "3级", "4级", "5级", "6级", "7级", "8级", "9级", "10级", "11级", "12级"]

export const COURSE_TOP_BAR_COLOR = [{"backgroundColor": "rgb(147, 133, 245)"}, {"backgroundColor": "rgb(45, 170, 166)"}, {"backgroundColor": "rgb(45, 170, 166)"}]

export const tableFormRatio = {
  "category": "15%",
  "serialName": "25%",
  "type": "10%",
  "ratio": "10%",
  "keywords": "35%"
}

export const CHINESE_MAPPING = {
  "level": "教师等级", 
  "rate": "工资", 
  "course_level": "课程等级",
  "type": "课程类型"
}

export const imagesList = [
  "img_coffee-title.jpg", 
  "img_violin2-title.jpg",
  "img_arts-title.jpg",
  "img_theatreopera-title.jpg",
  "img_learninstrument-title.jpg",
  "Design-title.jpg",
  "img_breakfast-title.jpg",
  "Honors-title.jpg",
  "img_graduation-title.jpg",
  "img_bookclub-title.jpg",
  "img_code-title.jpg",
  "img_reachout-title.jpg",
  "img_learnlanguage-title.jpg",
  "img_backtoschool-title.jpg",
  "English-title.jpg",
  "WorldHistory-title.jpg",
  "SocialStudies-title.jpg",
  "Geography-title.jpg",
  "USHistory-title.jpg",
  "Writing-title.jpg",
  "LanguageArts-title.jpg",
  "WorldStudies-title.jpg",
  "Psychology-title.jpg",
  "Math-title.jpg",
  "Physics-title.jpg",
  "Chemistry-title.jpg",
  "Biology-title.jpg",
  "Geometry-title.jpg"
]