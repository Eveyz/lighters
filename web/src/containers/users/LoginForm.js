import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../../AppContext'

import '../../css/App.css';
import { login } from "../../actions/users_actions.js";
import { FlashMessage } from '../../components/FlashMessage';

const LoginForm = props => {

  // eslint-disable-next-line
  const [state, setState] = useContext(AppContext)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bg_style = {
    backgroundImage: "linear-gradient(to right top, #ffc107, #ffb700, #ffad00, #ffa200, #ff9800)",
    minHeight: "100vh"
  }

  const submit = (values) => {
    setIsSubmitting(true)
    login(values, setState, setIsSubmitting)
  }

  return (
    <div>
      <div style={bg_style}>
        <br/>
        <Link to="/"><h3 className="center white-text no-margin">Lighters</h3></Link>
        <div className="container">
          <br/>
          <div className="row no-margin">
            <div className="col s12 m8 offset-m2">
              <div className="card r-box-shadow">
                <div className="card-content">
                  <div className="row">
                    <div className="col s12 m10 offset-m1">
                      <h4 className="center">登录</h4>
                      <br/>
                      <Formik
                        initialValues={{ username: '', password: '', remember_me: false }}
                        onSubmit={(values, { setSubmitting }) => {
                          submit(values);
                        }}
                        validationSchema={Yup.object().shape({
                          username: Yup.string()
                            .required('用户名不能为空'),
                          password: Yup.string()
                            .min(6, '密码长度至少为6位')
                            .required('密码不能为空')
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
                              {errors.email && touched.email && <FlashMessage props={{status: "error", msg: errors.email}} />}
                              {errors.password && touched.password && <FlashMessage props={{status: "error", msg: errors.password}} />}

                              {
                                isSubmitting ? <div className="center loader"></div> : ""
                              }

                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <input 
                                    type="text" 
                                    name="username" 
                                    id="username"
                                    ref={this.usernameInput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="validate"
                                    disabled={isSubmitting}
                                  />
                                  <label htmlFor="username">用户名 <span className="required">*</span></label>
                                </div>
                              </div>

                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    autoComplete="true" 
                                    ref={this.passwordInput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="validate"
                                    disabled={isSubmitting}
                                  />
                                  <label htmlFor="email">密码 <span className="required">*</span></label>
                                </div>
                              </div>

                              <div className="row no-margin">
                                <div className="col m12 s12">
                                  <input 
                                    type="checkbox" 
                                    name="remember_me"
                                    className="filled-in"
                                    id="remember_me"
                                    ref={this.checkboxInput}
                                  ></input>
                                  <label htmlFor="remember_me">记住登录</label>
                                </div>
                              </div>
                              <br/>
                              <div className="row no-margin">
                                <div className="input-field col m12 s12">
                                  <button type="submit" disabled={isSubmitting} className="btn">登录</button>
                                </div>
                              </div>

                            </form>
                          );
                        }}
                      </Formik>
                      
                      <div className="row no-margin">
                        <div className="input-field col m12 s12">
                          <Link to="/login">注册</Link>
                          <br/>
                          <Link to="/password/reset">忘记密码</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-bottom-nav center">
            <Link to="/" className="dot-after">关于Lighters</Link>
            <Link to="/terms" className="dot-after">服务条款</Link>
            <Link to="/help" className="dot-after">帮助</Link>
            <Link to="/jobs">加入我们</Link>
          </div>
          <br/>
          <br/>
        </div>

      </div>
    </div>
  )
}

export default LoginForm