import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik'
import M from 'materialize-css'
import * as Yup from 'yup'
import axios from 'axios'
import history from '../../../../history'

const AdminTeacherNewForm = props => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const buttonColor = isSubmitting ? "#bdc3c7" : "#2ecc71";
  const buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"};

  useEffect(() => {
    M.updateTextFields()
    M.AutoInit()
  }, [])

  const submit = (values) => {
    setIsSubmitting(true)
    if(props.action === "NEW") {
      axios.post(`/admin/createTeacher`, { teacher: values })
        .then((response) => {
          setIsSubmitting(false)
          history.push(`/admin/teachers/all`);
          window.Materialize.toast('成功添加', 1000, 'green');
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      const data = {
        _id: props.teacher._id,
        teacher: values
      }
      axios.put(`/admin/updateTeacher`, data)
        .then((response) => {
          setIsSubmitting(false)
          history.push(`/admin/teachers/all`);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <Formik
      initialValues={{
        firstname: props.teacher.firstname || "",
        lastname: props.teacher.lastname || "",
        englishname: props.teacher.englishname || "",
        age: props.teacher.age || "",
        birthday: props.teacher.birthday || "",
        gender: props.teacher.gender || "女",
        city: props.teacher.city || ""
      }}
      onSubmit={(values) => {
        submit(values);
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required('此项为必填项!'),
        lastname: Yup.string().required('此项为必填项!'),
        gender: Yup.string().required('此项为必填项!'),
        city: Yup.string().required('此项为必填项!'),
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <div className="row no-margin">
              <div className="input-field col s12 m6">
                <input 
                  type="text"
                  name="lastname" 
                  id="lastname" 
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.lastname} 
                />
                {errors.lastname &&
                touched.lastname && (
                  <div className="inline-form-error-msg">
                    {errors.lastname}
                  </div>
                )}
                <label htmlFor="lastname">姓 <span className="required">*</span></label>
              </div>
              <div className="input-field col s12 m6">
                <input 
                  type="text"
                  name="firstname" 
                  id="firstname"
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.firstname} 
                />
                {errors.firstname &&
                  touched.firstname && (
                    <div className="inline-form-error-msg">
                      {errors.firstname}
                    </div>
                  )}
                <label htmlFor="firstname">名 <span className="required">*</span></label>
              </div>
            </div>

            <div className="row no-margin">
              <div className="input-field col s12 m12">
                <input 
                  type="text"
                  name="englishname" 
                  id="englishname" 
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.englishname} 
                />
                <label htmlFor="englishname">英文名字/教师昵称</label>
              </div>
            </div>

            <div className="row no-margin">
              <div className="input-field col s12 m12">
                <input 
                  type="number"
                  name="age" 
                  id="age" 
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.age} 
                />
                <label htmlFor="age">年龄</label>
              </div>
            </div>

            <div className="row no-margin">
              <div className="col s12 m12">
                <label htmlFor="birthday">出生日期</label>
                <input
                  type="date"
                  name="birthday" 
                  id="birthday" 
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.birthday} 
                />
              </div>
            </div>
            <br/>
            <div className="row no-margin">
              <div className="input-field col m12 s12">
                <select 
                  name="gender"
                  value={values.gender}
                  className="validate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value='女'>女</option>
                  <option value='男'>男</option>
                </select>
                <label>性别 <span className="required">*</span></label>
              </div>
            </div>

            <div className="row no-margin">
              <div className="input-field col s12 m12">
                <input 
                  type="text"
                  name="city" 
                  id="city" 
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.city} 
                />
                {errors.city &&
                  touched.city && (
                    <div className="inline-form-error-msg">
                      {errors.city}
                    </div>
                  )}
                <label htmlFor="city">所在城市 <span className="required">*</span></label>
              </div>
            </div>

            <div className="row no-margin">
              <div className="input-field">
                <button 
                  disabled={isSubmitting} 
                  className="col m12 s12" 
                  style={buttonStyle}
                  type="submit"
                >
                  <span style={{color: "white", fontSize: "20px"}}><b>提交</b></span>
                </button>
              </div>
            </div>

            <div className="row no-margin">
              <div className="input-field">
                <Link 
                  className="col m12 s12 white r-box-shadow" 
                  to={"/admin/teachers/all"}
                  style={
                    {padding: "11px 0px 11px 0px", borderRadius: "15px", border: "none", cursor: "pointer"}
                  }
                >
                  <span className="center" style={{color: "black", fontSize: "20px"}}><b>返回</b></span>
                </Link>
              </div>
            </div>

          </form>
        )
      }}
    </Formik>
  )
}

export default AdminTeacherNewForm;