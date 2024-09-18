import React, { useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import history from '../../../history'
import axios from 'axios'

const ActivateForm = props => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailRef = useRef(null)
  const passRef = useRef(null)
  const passConRef = useRef(null)

  const submit = (values) => {
    setIsSubmitting(true)
    axios.post(`/users/${props.id}/activate`, {
      id: props.id,
      email: emailRef.current.value,
      password: passRef.current.value,
      passwordCon: passConRef.current.value
    })
      .then((response) => {
        setIsSubmitting(false)
        history.push('/login')
        window.Materialize.toast(`账号激活成功, 欢迎来到Lighters绘说英语! 请试用新密码登录`, 3000, 'green')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const buttonColor = isSubmitting ? "#bdc3c7" : "#2ecc71";
  const buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"};

  return (
    <Formik
      initialValues={{ 
        email: "",
        password: "",
        passwordCon: "",
        id: props.id
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('邮箱格式不正确!').required('此项为必填项!'),
        password: Yup.string().min(6, '密码长度至少为6位').required('密码不能为空'),
        passwordCon: Yup.string().oneOf([Yup.ref('password')], '密码不对应').required('请确认密码')
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
        } = props;
        return (
          <form>
            <div className="row no-margin">
              <div className="input-field col s12 m12">
                <input 
                  type="text"
                  name="email" 
                  id="email" 
                  ref={emailRef}
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.email} 
                />
                {errors.email &&
                  touched.email && (
                    <div className="inline-form-error-msg">
                      {errors.email}
                    </div>
                  )}
                <label htmlFor="username">填写邮箱 <span className="required">*</span></label>
              </div>
            </div>
      
            <div className="row no-margin">
              <div className="input-field col s12 m12">
                <input 
                  type="password"
                  name="password" 
                  id="password"
                  ref={passRef}
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.password} 
                />
                {errors.password &&
                  touched.password && (
                    <div className="inline-form-error-msg">
                      {errors.password}
                    </div>
                  )}
                <label htmlFor="password">填写新的密码 <span className="required">*</span></label>
              </div>
            </div>
      
            <div className="row no-margin">
              <div className="input-field col s12 m12">
                <input 
                  type="password"
                  name="passwordCon" 
                  id="passwordCon"
                  ref={passConRef}
                  className="validate"
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.passwordCon} 
                />
                {errors.passwordCon &&
                  touched.passwordCon && (
                    <div className="inline-form-error-msg">
                      {errors.passwordCon}
                    </div>
                  )}
                <label htmlFor="passwordCon">确认密码 <span className="required">*</span></label>
              </div>
            </div>
      
            <div className="row no-margin">
              <div className="input-field">
                <button 
                  disabled={isSubmitting} 
                  className="col m12 s12" 
                  style={buttonStyle}
                  type="button"
                  onClick={submit}
                >
                  <span style={{color: "white", fontSize: "20px"}}><b>激活</b></span>
                </button>
              </div>
            </div>
      
          </form>
        )
      }}
    </Formik>
  )
}

export default ActivateForm;

// const TeacherForm = props => {
//   const {
//       values,
//       errors,
//       touched,
//       handleChange,
//       handleBlur,
//       handleSubmit,
//       isSubmitting,
//   } = props;
//   const buttonColor = isSubmitting ? "#bdc3c7" : "#2ecc71";
//   const buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"};

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="row no-margin">
//         <div className="input-field col s12 m12">
//           <input 
//             type="text"
//             name="email" 
//             id="email" 
//             className="validate"
//             onChange={handleChange} 
//             onBlur={handleBlur} 
//             value={values.email} 
//           />
//           {errors.email &&
//             touched.email && (
//               <div className="inline-form-error-msg">
//                 {errors.email}
//               </div>
//             )}
//           <label htmlFor="username">填写邮箱 <span className="required">*</span></label>
//         </div>
//       </div>

//       <div className="row no-margin">
//         <div className="input-field col s12 m12">
//           <input 
//             type="password"
//             name="password" 
//             id="password" 
//             className="validate"
//             onChange={handleChange} 
//             onBlur={handleBlur} 
//             value={values.password} 
//           />
//           {errors.password &&
//             touched.password && (
//               <div className="inline-form-error-msg">
//                 {errors.password}
//               </div>
//             )}
//           <label htmlFor="password">填写新的密码 <span className="required">*</span></label>
//         </div>
//       </div>

//       <div className="row no-margin">
//         <div className="input-field col s12 m12">
//           <input 
//             type="password"
//             name="passwordCon" 
//             id="passwordCon" 
//             className="validate"
//             onChange={handleChange} 
//             onBlur={handleBlur} 
//             value={values.passwordCon} 
//           />
//           {errors.passwordCon &&
//             touched.passwordCon && (
//               <div className="inline-form-error-msg">
//                 {errors.passwordCon}
//               </div>
//             )}
//           <label htmlFor="passwordCon">确认密码 <span className="required">*</span></label>
//         </div>
//       </div>

//       <div className="row no-margin">
//         <div className="input-field">
//           <button 
//             disabled={isSubmitting} 
//             className="col m12 s12" 
//             style={buttonStyle}
//             type="submit"
//           >
//             <span style={{color: "white", fontSize: "20px"}}><b>激活</b></span>
//           </button>
//         </div>
//       </div>

//     </form>
//   )
// }

// export default TeacherForm;