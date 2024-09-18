import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import { FlashMessage } from '../../components/FlashMessage'
import Background from '../../images/bg.png'
import history from '../../history'
import axios from 'axios'

const ResetPassword = props => {

  const submit = (values) => {
    var token = props.location.search.split("=")[1]
    values.token = token
    console.log(values)
    axios.post('/users/reset_password', {
      token: token,
      password: values.password,
      passwordCon: values.passwordCon
    })
    .then(res => {
      window.Materialize.toast('密码修改成功', 1000, 'green');
      history.push("/login")
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
                  <div className="row">
                    <div className="col s12 m10 offset-m1">
                      <h4 className="center">重设密码</h4>
                      <br/>
                      <Formik
                        initialValues={{ password: '', passwordCon: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                          submit(values);
                        }}
                        validationSchema={Yup.object().shape({
                          password: Yup.string().min(6, '密码长度至少为6位').required('密码不能为空'),
                          passwordCon: Yup.string().oneOf([Yup.ref('password')], '请输入相同的密码').required('请确认密码')
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
                              {errors.password && touched.password && <FlashMessage props={{status: "error", msg: errors.password}} />}
                              {errors.passwordCon && touched.passwordCon && <FlashMessage props={{status: "error", msg: errors.passwordCon}} />}

                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    autoComplete="true"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="validate"
                                  />
                                  <label htmlFor="password">密码 <span className="required">*</span></label>
                                </div>
                              </div>

                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <input 
                                    type="password" 
                                    name="passwordCon" 
                                    id="passwordCon"
                                    autoComplete="false" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="validate"
                                  />
                                  <label htmlFor="passwordCon">确认密码 <span className="required">*</span></label>
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

export default ResetPassword