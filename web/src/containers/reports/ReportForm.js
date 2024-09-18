import React, { useState, useRef } from 'react';
import axios from 'axios'

import { getFullDate } from '../../ultis';
import FormPick from '../forms/FormPick';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import TableForm from './TableForm';
// import BooksForReport from './BooksForReport';
import Working from '../../components/Working';
import AudiosFileList from './AudiosFileList';

// import { addReport, updateReport } from '../../actions/reports_actions';
// import { setLoadingStatus } from '../../actions/status_actions';
import history from '../../history';

const ReportForm = props => {

  const [isLoading, setIsLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [situation, setSituation] = useState(props.action === "NEW" ? 1 : props.report.situation === "取消" ? -1 : 1)
  const [comment, setComment] = useState(props.action === "NEW" ? "" : (props.report.tutor_comment || ""))
  const [homework, setHomework] = useState(props.action === "NEW" ? "" : (props.report.homework || ""))
  const [course_content, setCourseContent] = useState(props.action === "NEW" ? [{}] : props.report.course_content)
  const [removedFiles, setRemovedFiles] = useState([])

  const courseDate = useRef(null)
  const startTime = useRef(null)
  const endTime = useRef(null)
  const focusTime = useRef(null)
  const audioLinks = useRef(null)
  const audioFile = useRef(null)
  const situationRef = useRef(null)
  const reason = useRef(null)

  const getInputData = (field_name, val) => {
    // check if course is cancelled
    if(field_name === "comment") setComment(val)
    if(field_name === "homework") setHomework(val)
    if(situationRef.current.value === "取消") {
      setSituation(-1)
      if(reason.current.value) {
        setValid(true)
      } else {
        setValid(false)
      }
    } else {
      setValid(false)
      setSituation(1)
      // course not cancelled, keep going here
      if(courseDate.current.value && startTime.current.value && endTime.current.value && focusTime.current.value && comment && homework && situationRef.current.value) {
        // only reset state => True if form is not valid
        if(!valid) setValid(true)
      } else {
        // only reset state => False if form is valid
        if(valid) setValid(false)
      }
    }
  }

  const checkFileBeforeUpload = () => {
    const audio_files = Array.from(audioFile.current.files);
    audio_files.forEach(file => {
      const ext = file.name.split(".").pop();
      const exts = ['mp3', 'wav']
      if(exts.includes(ext)) {
        if(!valid) setValid(true)
      } else {
        window.Materialize.toast('请选择音频文件', 5000);
        if(valid) setValid(false)
      }
    });
  }

  const getTableFormData = (tableFormData) => {
    // console.log("table form data: ", tableFormData)
    setCourseContent(tableFormData)
  }

  // eslint-disable-next-line
  const removeUploadedFile = (file, report_id) => {
    let _report = props.report;
    _report.audios_files = _report.audios_files.filter(f => f.path !== file.path);
    // const index = state.reports.findIndex(report => report._id === report_id);
    setRemovedFiles([...removedFiles, file])
  }

  const back = (e) => {
    e.preventDefault()
    history.push({
      pathname: `/teachers/${props.teacher._id}/reports`,
      state: { student: props.student, teacher: props.teacher, course: props.course }
    })
  }
  
  // Report form submitted
  const handleSubmit = (e) => {
    // e.preventDefault();
    const audio_files = Array.from(audioFile.current.files);
    let _course_date = courseDate.current.value
    if(_course_date.length < 10) {
      _course_date = getFullDate(_course_date)
    }
    let report = {
      teacher_id: props.teacher._id,
      course_id: props.course._id,
      student_id: props.student._id,
      course_date: _course_date,
      situation: situationRef.current.value,
      start_time: startTime.current.value,
      end_time: endTime.current.value,
      focus: focusTime.current.value,
      course_content: course_content,
      tutor_comment: comment,
      homework: homework,
      external_link: audioLinks.current.value,
      audios: audio_files,
      audios_files: props.action === "EDIT" ? props.report.audios_files : [],
      // review_books: this.props.reviewBooks,
      // new_books: this.props.newBooks,
      // future_books: this.props.futureBooks,
      removedFiles: removedFiles,
    }
    if(situation < 0) {
      report = {
        teacher_id: props.teacher_id,
        course_id: props.course_id,
        student_id: props.student_id,
        course_date: _course_date,
        situation: situationRef.current.value,
        reason: reason.current.value
      }
    }

    let path = "/teachers/" + props.teacher._id + "/reports";

    setIsLoading(true)

    var data = new FormData();
    if(props.action === "NEW") {
      // this.props.addReport(report, path)
      if(report['audios'] && report['audios'].length > 0) {
        report['audios'].forEach(file => {
          data.append('audios', file);
        });
      }
      let report_json = JSON.stringify(report);
      localStorage.setItem("report", report_json);
      data.append('report', report_json);
      axios.post(`/reports`, data, { timeout: 60000 })
        .then((response) => {
          setIsLoading(false)
          history.push({
            pathname: path,
            state: { student: props.student, course: props.course, teacher: props.teacher }
          })
          window.Materialize.toast('成功添加反馈表', 2000, 'green');
        })
        .catch((err) => {
          if(err.code === "ECONNABORTED") {
            window.Materialize.toast('网络连接超时', 5000, 'black');
            setIsLoading(false)
          }
          console.log("there was an error while adding a new report: ", err)
        })
    } else if(props.action === "EDIT") {
      // this.props.updateReport(this.props.report._id, report, path)
      if(report['audios'] && report['audios'].length > 0) {
        report['audios'].forEach(file => {
          data.append('audios', file);
        });
      }
      let report_json = JSON.stringify(report);
      localStorage.setItem("report", report_json);
      data.append('report', report_json);
      axios.post(`/reports/${props.report._id}`, data, { timeout: 60000 })
      .then((response) => {
        setIsLoading(false)
        history.push({
          pathname: path,
          state: { student: props.student, course: props.course, teacher: props.teacher }
        })
        window.Materialize.toast('成功更新反馈表', 1000, 'green');
      })
      .catch((err) => {
        if(err.code === "ECONNABORTED") {
          window.Materialize.toast('网络连接超时', 5000, 'black');
          setIsLoading(false)
        }
        console.log("there are some erros while updating the report: ", err)
      })
    }
  }


  // let disabled = !this.state.valid;
  let visiblity = situation < 0 ? "display-none" : "display-block";
  let notVisiblity = situation < 0 ? "display-block" : "display-none";

  let buttonColor = isLoading ? "#bdc3c7" : "#2ecc71";
  let buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"}

  // let path = props.action === "EDIT" ? "/teachers/" + props.teacher_id + "/reports" : "/teachers/" + props.teacher_id + "/course_manager";

  let audiosFileList = props.action === "EDIT" ? <AudiosFileList files={props.report.audios_files} report_id={props.report._id} /> : "";

  const workingInfo = isLoading ? <Working msg={`正在提交反馈表, 请耐心等候 :) ${props.teacher.englishname}老师辛苦了, 先去放松一下吧!`} /> : null

  const disabled = isLoading ? true : false

  return(
    <div>
      {workingInfo}
      <div className="row no-margin">
        <FormPick
          classes="input-field col m12 s12"
          type="date"
          name="course_date"
          label="上课日期"
          required={true}
          errorMsg="请选择上课日期"
          refFromParent={courseDate}
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.course_date : ""}
        />
      </div>

      <div className="row no-margin">
        <FormSelect
          classes="input-field col m12 s12"
          name="situation"
          label="上课情况"
          required={true}
          errorMsg="请选择上课情况"
          refFromParent={situationRef}
          getInputData={getInputData}
          action={props.action}
          prompt="请选择上课情况"
          options={["正常上课", "平台赠课或一对一学员特殊情况首次缺课", "学员开课前2小时内才请假(0.5个课时费)", "学员上课时间后才请假或无故缺课(1个课时费)", "学员迟到(不必补全课时, 可按时下课, 1个课时费)", "老师迟到早退10分钟以内(需免费于当堂或下堂课补全课时才可得1个课时费, 但会影响薪资晋级)", "老师无故迟到10分钟以上20分钟以内并且课程依旧进行(0.5个课时费)", "老师无故迟到并且取消课程(0个课时费, 需免费补课一节)", "免费补课(0个课时费)", "试课(0个课时费)", "代课(1个课时费)", "小组课单个学员首次请假(学员付0.5课时费观看上课录屏, 老师照旧获1课时费)", "小组课单个学员非首次请假(学员付1课时费观看上课录屏, 老师获1课时费)"]}
          value={props.action === "EDIT" ? props.report.situation : ""}
        />
      </div>

      <div className={"row no-margin " + notVisiblity}>
        <FormInput
          classes="input-field col m12 s12"
          name="reason"
          inputType="text"
          label="取消原因"
          required={true}
          errorMsg="取消原因"
          refFromParent={reason}
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.reason : ""}
        />
      </div>

      <div className={"row no-margin " + visiblity}>
        <FormPick
          classes="input-field col m6 s12"
          type="time"
          name="start_time"
          label="开始时间"
          required={true}
          errorMsg="请选择开始时间"
          refFromParent={startTime}
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.start_time : ""}
        />
        <FormPick
          classes="input-field col m6 s12"
          type="time"
          name="end_time"
          label="结束时间"
          required={true}
          errorMsg="请选择结束时间"
          refFromParent={endTime}
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.end_time : ""}
        />
      </div>

      <div className={"row no-margin " + visiblity}>
        <FormInput
          classes="input-field col m12 s12"
          name="focus_time"
          inputType="number"
          label="学生专注时间(分钟)"
          required={true}
          errorMsg="请填写学生专注的时间"
          refFromParent={focusTime}
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.focus : ""}
        />
      </div>

      {/* <div className={"row no-margin " + visiblity}>
        <BooksForReport action={action} />
      </div>
      <br/> */}

      <div className={"row no-margin no-autoinit " + visiblity}>
        <div className="row no-margin">
          <div className="input-field col m12 no-margin">
            <h5 className="orange-text">上课内容</h5>
          </div>
        </div>
        <blockquote className="blockquote-style no-margin">
          <p>此行填写格式为：</p>
          <br/>
          <p>Lighters绘说英语阅读资源类型有：主流分级绘本, 名家绘本, 自然拼读, 科普读物, 动画视频, 写作教程, (初高中)章节小说, 学生自读</p>
        </blockquote>
        <TableForm 
          action={props.action} 
          value={props.action === "EDIT" ? course_content : [{}] }
          saveValue={getTableFormData}
        />
        {/* <FormTextarea
          classes="input-field col m12 s12"
          name="course_content"
          label="上课内容"
          required={true}
          errorMsg="请填写上课内容"
          getInputData={getInputData}
          action={action}
          value={action === "EDIT" ? props.report.course_content : ""}
        /> */}
        <br/>
      </div>

      <div className={"row no-margin no-autoinit " + visiblity}>
        <div className="row no-margin">
          <div className="input-field col m12 no-margin">
            <h5 className="orange-text">上课反馈</h5>
          </div>
        </div>
        <blockquote className="blockquote-style no-margin">
          <p>反馈内容主要涉及这几个方面：</p>
          <p><b>听</b> （上课对英语的听力反应，对音频视频的理解）</p>
          <p><b>说</b> （发音、自然拼读能力、英语对话口语能力）</p>
          <p><b>读</b> （朗读语音语调、role play、猜词推理能力）</p>
          <p><b>写</b> （表达、描述、议论、逻辑语言组织等）</p>
          <p><b>综合英语能力</b> （词汇句型掌握情况, 语法等）</p>
          <p>【基本技能】</p>
          <p>+ </p>
          <p>【扩展技能】</p>
          <p>想象力、记忆力、理解力、总结复述能力、知识面、分析思考评判能力、批判性思维、创新性思维、知识运用能力、上课专注力配合等</p>
          <br/>
          <p>不用面面俱到，可选择最关键点进行课堂总结与学生学习情况反馈</p>
        </blockquote>
        <FormTextarea
          classes="input-field col m12 s12"
          name="comment"
          label="上课反馈"
          required={true}
          errorMsg="请填写上课反馈"
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.tutor_comment : ""}
        />
      </div>

      <div className={"row no-margin no-autoinit " + visiblity}>
        <div className="row no-margin">
          <div className="input-field col m12 no-margin">
            <h5 className="orange-text">课后任务</h5>
          </div>
        </div>
        <blockquote className="blockquote-style no-margin">
          <p>在此布置课下作业：主要提醒每日听音频 (精听+泛听)、复习 (精读+泛读)、朗读模仿、并打卡录音；创意性的作业设计能更大地激发学生的学习热情；请多设计task-based, inquiry-based, research-based, project-based 等能激发孩子学习动力的趣味性作业任务。</p>
          <p>也可在此与家长进行正式交流，提出家长配合需求与建议</p>
        </blockquote>
        <FormTextarea
          classes="input-field col m12 s12"
          name="homework"
          label="课后任务"
          required={true}
          errorMsg="请填写课后任务"
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.homework : ""}
        />
      </div>

      <br/>
      <div className={"row no-margin " + visiblity}>
        {audiosFileList}
      </div>

      <div className={"row no-margin " + visiblity} style={{marginBottom: "0px"}}>
        <FormInput
          classes="input-field col m12 s12"
          name="audio_links"
          inputType="text"
          label="课程音频网盘链接"
          required={false}
          errorMsg=""
          refFromParent={audioLinks}
          getInputData={getInputData}
          action={props.action}
          value={props.action === "EDIT" ? props.report.external_link : ""}
        />
      </div>
      <div className={"row no-margin " + visiblity}>
        <div className="input-field col m12 s12 no-margin">
          <p>或者上传</p>
        </div>
      </div>
      <div className={"row no-margin " + visiblity}>
        <div className="file-field input-field col m12 s12">
          <div className="btn cyan">
            <span>上课录音文件</span>
            <input 
              type="file" 
              multiple 
              ref={audioFile}
              onChange={checkFileBeforeUpload}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col m12 s12">
          <button  
            className="col m12 s12"
            disabled={disabled}
            onClick={handleSubmit}
            style={buttonStyle}
          >
            <span style={{color: "white", fontSize: "20px"}}><b>提交</b></span>
          </button>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col m12 s12">
          <a 
            href=""
            className="col m12 s12 white r-box-shadow"
            style={
              {padding: "11px 0px 11px 0px", borderRadius: "15px", border: "none", cursor: "pointer"}
            }
            onClick={back}
          >
            <span className="center" style={{color: "black", fontSize: "20px"}}><b>返回</b></span>
          </a>
        </div>
      </div>

    </div>
  )
}

export default ReportForm