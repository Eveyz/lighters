import React from 'react';
import { Link } from 'react-router-dom';

const BookForm = props => {
  const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      handleSubmit,
      isSubmitting,
  } = props;
  const buttonColor = isSubmitting ? "#bdc3c7" : "#2ecc71";
  const buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"};
  let uploadedBook = values.file.originalname ? <div className="row no-margin"><div className="input-field col s12 m12"><h6 className="airbnb-font bold">已上传的绘本文件: {values.file.originalname}</h6><p className="grey-text">(如想替换绘本文件, 请重新上传新的文件)</p></div></div> : ""

  return (
    <form onSubmit={handleSubmit}>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="lightersLevel" 
            id="lightersLevel" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.lightersLevel} 
          />
          {errors.lightersLevel &&
          touched.lightersLevel && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>
              {errors.lightersLevel}
            </div>
          )}
          <label htmlFor="lightersLevel">Lighters等级</label>
        </div>
      </div>

      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="americanGrade" 
            id="americanGrade" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.americanGrade} 
          />
          {errors.americanGrade &&
            touched.americanGrade && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.americanGrade}
              </div>
            )}
          <label htmlFor="americanGrade">美国对应年级</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="razLevel" 
            id="razLevel" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.razLevel} 
          />
          {errors.razLevel &&
            touched.razLevel && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.razLevel}
              </div>
            )}
          <label htmlFor="razLevel">RAZ Level</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="lexileLevel" 
            id="lexileLevel" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.lexileLevel} 
          />
          {errors.lexileLevel &&
            touched.lexileLevel && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.lexileLevel}
              </div>
            )}
          <label htmlFor="lexileLevel">Lexile Level</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="age" 
            id="age" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.age} 
          />
          {errors.age &&
            touched.age && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.age}
              </div>
            )}
          <label htmlFor="age">年龄</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="category" 
            id="category" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.category} 
          />
          {errors.category &&
            touched.category && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.category}
              </div>
            )}
          <label htmlFor="category">绘本分类</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="serials" 
            id="serials" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.serials} 
          />
          {errors.serials &&
            touched.serials && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.serials}
              </div>
            )}
          <label htmlFor="serials">系列名称</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="name" 
            id="name" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.name} 
          />
          {errors.name &&
            touched.name && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.name}
              </div>
            )}
          <label htmlFor="name">绘本名称</label>
        </div>
      </div>
      <div className="row no-margin">
        <div className="input-field col s12 m12">
          <input 
            type="text"
            name="audioLink" 
            id="audioLink" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.audioLink} 
          />
          {errors.audioLink &&
            touched.audioLink && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.audioLink}
              </div>
            )}
          <label htmlFor="audioLink">网盘链接</label>
        </div>
      </div>

      {uploadedBook}

      <div className="row no-margin">
        <div className="file-field input-field col m12 s12">
          <div className="btn cyan">
            <span>绘本文件</span>
            <input id="file" name="file" type="file" onChange={(event) => {
              setFieldValue("file", event.currentTarget.files[0]);
            }} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          {errors.file &&
            touched.file && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.file}
              </div>
            )}
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
            to={"/books"}
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
}

export default BookForm;