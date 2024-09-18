import React, { useEffect } from 'react'
import M from 'materialize-css'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { FlashMessage } from '../../../components/FlashMessage'

const TransactionForm = props => {

  useEffect(() => {
    M.updateTextFields()
    M.AutoInit()
  }, [])

  const cancel = () => {
    props.cancel()
  }

  return (
    <div>
      <div className="row">
        <div className="col s12 m12">
          <h5 className="airbnb-font bold center">交易明细表单</h5>
          <br/>
          <Formik
            initialValues={{
              src: props.transaction.src || '', 
              dest: props.transaction.dest || '', 
              amount: props.transaction.amount || '',
              memo: props.transaction.memo || '',
              status: props.transaction.status || 'IN',
            }}
            onSubmit={(values, { setSubmitting }) => {
              props.addTransaction(values)
              props.cancel()
            }}
            validationSchema={Yup.object().shape({
              src: Yup.string().required('来源不能为空'),
              dest: Yup.string().required('目的地不能为空'),
              amount: Yup.number().required('金额不能为空')
            })}
          >
            {props => {
              const {
                touched,
                errors,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  {errors.src && touched.src && <FlashMessage props={{status: "error", msg: errors.src}} />}
                  {errors.dest && touched.dest && <FlashMessage props={{status: "error", msg: errors.dest}} />}
                  {errors.status && touched.status && <FlashMessage props={{status: "error", msg: errors.status}} />}
                  {errors.dest && touched.dest && <FlashMessage props={{status: "error", msg: errors.dest}} />}
                  {errors.amount && touched.amount && <FlashMessage props={{status: "error", msg: errors.amount}} />}

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <select 
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value='IN'>收入</option>
                        <option value='OUT'>支出</option>
                      </select>
                      <label>支出或收入</label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col s12 m6">
                      <input 
                        type="text"
                        name="src" 
                        id="src"
                        className="validate"
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.src} 
                      />
                      <label htmlFor="src">从 <span className="required">*</span></label>
                    </div>
                    <div className="input-field col s12 m6">
                      <input 
                        type="text"
                        name="dest" 
                        id="dest" 
                        className="validate"
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.dest} 
                      />
                      <label htmlFor="dest">到 <span className="required">*</span></label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="number" 
                        name="amount" 
                        id="amount" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount}
                      />
                      <label htmlFor="amount">金额(元) <span className="required">*</span></label>
                    </div>
                  </div>

                  <div className="row no-margin">
                    <div className="input-field col m12 s12">
                      <input 
                        type="text" 
                        name="memo" 
                        id="memo" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="validate"
                        value={values.memo} 
                      />
                      <label htmlFor="memo">备忘录</label>
                    </div>
                  </div>

                  <br/>
                  <div className="row no-margin">
                    <div className="input-field col m6 s12">
                      <button type="submit" className="btn">添加</button>
                    </div>
                    <div className="input-field col m6 s12">
                      <button type="button" className="btn white black-text right" onClick={cancel}>取消</button>
                    </div>
                  </div>

                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default TransactionForm