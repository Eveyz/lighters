import React, { useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import { FlashMessage } from '../../components/FlashMessage'
import Background from '../../images/bg.png'

const ForgetPassword = props => {

  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  var username = useRef(null)
  var email = useRef(null)

  const submit = (values) => {
    setSubmitted(true)
    axios.post(`/users/send_reset_password_email`, values)
    .then(res => {
      setDone(true)
      setSubmitted(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const bg_style = {
    minHeight: "700px",
    background: "url(" + Background + ") no-repeat", 
    backgroundSize: "cover"
  }

  return (
    <div>
      <Header />
      <div className="" style={bg_style}>
        <div className="container">
          <br/>
          <br/>
          <div className="row no-margin">
            <div className="col s12 m8 offset-m2">
              <div className="card r-box-shadow">
                <div className="card-content">
                  {
                    done ?
                    <div className="row">
                      <div className="col s12 m10 offset-m1">
                        <h5 className="center">已发送重置密码邮件到您填写的邮箱，请注意查看邮箱</h5>
                      </div>
                    </div>
                    :
                    submitted ?
                    <div>
                      <div className="progress">
                        <div className="indeterminate"></div>
                      </div>
                      <h6 className="center">提交中...</h6>
                    </div>
                    :
                    <div className="row">
                      <div className="col s12 m10 offset-m1">
                        <h4 className="center">忘记密码</h4>
                        <br/>
                        <Formik
                          initialValues={{ username: '', email: '' }}
                          onSubmit={(values) => {
                            submit(values);
                          }}
                          validationSchema={Yup.object().shape({
                            username: Yup.string().required('用户名不能为空'),
                            email: Yup.string().email().required('邮箱不能为空'),
                          })}
                        >
                          {props => {
                            const {
                              touched,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                            } = props;
                            
                            return (
                              <form onSubmit={handleSubmit}>
                                {errors.username && touched.username && <FlashMessage props={{status: "error", msg: errors.username}} />}
                                {errors.email && touched.email && <FlashMessage props={{status: "error", msg: errors.email}} />}

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="text" 
                                      name="username" 
                                      id="username"
                                      ref={username}
                                      autoComplete="true"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="username">用户名 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="text" 
                                      name="email" 
                                      id="email"
                                      ref={email}
                                      autoComplete="false" 
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="email">邮箱 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <br/>
                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <button type="submit" className="btn cyan">提交</button>
                                  </div>
                                </div>

                              </form>
                            );
                          }}
                        </Formik>
                        
                      </div>
                    </div>
                  }
                
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default ForgetPassword