import React from 'react';
import { Col, Row } from 'react-materialize'
import '../../css/mainpages.css';
import '../../css/App.css';
import history from '../../history'

import Header from './Header';
import Footer from './Footer';
import TeachersCards from '../mainpages/teachersCards';

import book1 from '../../images/b1.png'
import book2 from '../../images/b2.png'
import book3 from '../../images/b3.png'
import book4 from '../../images/b4.jpg'
// import book5 from '../../images/b5.jpeg'
import uphill from '../../images/hillup.svg'
import circle from '../../images/circle.svg'
import computer from '../../images/computer.png'
// import verticalBars from '../../images/vertical-bars.svg'

const Home = props => {

  const signup = () => {
    history.push('/signup')
  }

  return (
    <div className="top-wrapper">
      <div>
        <div className="slider-wrapper">
          <div className="main-img-wrapper"></div>
          <div className="main-img-wrapper"></div>
          <div className="main-img-wrapper"></div>
        </div>
      </div>
      <div className="mainpage-content-wrapper">
        <Header action="mainpage" />
        <div className="row above-img" style={{marginTop: "120px"}}>
          <div className="col offset-m6 m6">
            <h2 className="center-align white-text">读故事，学英语</h2>
          </div>
        </div>
        <div className="row above-img">
          <div className="col offset-m6 m6">
            <div className="transparent-btn center-align" onClick={signup}>申请试课</div>
          </div>
        </div>
        <div className="row above-img">
          <div className="col offset-m6 m6">
            <div className="transparent-btn center-align" onClick={signup}>申请教职</div>
          </div>
        </div>
      </div>
      <section className="section-one" style={{display: "none"}}>
        <div>
          {/* <img src={triangle} width="960px" alt="triangle" /> */}
          <div>
            <h3>我们的优势</h3>
            <ul>
              <li>
                <div className="no-margin" style={{padding: "0px 10px 0px 0px"}}><i className="material-icons section-one-icon" style={{color: "#3f51b5"}}>share</i></div>
                <div className="no-margin no-padding">
                  <h4>结构性课程设计</h4>
                  <p>Our courses are designed to keep you on track, so you learn to code "today" not "someday."</p>
                </div>
              </li>
              <li>
                <div className="no-margin" style={{padding: "0px 10px 0px 0px"}}><i className="material-icons section-one-icon" style={{color: "#009688"}}>web</i></div>
                <div className="no-margin no-padding">
                  <h4>在线模式</h4>
                  <p>Drill the material with 85 coding quizzes and feel comfortable and confident.</p>
                </div>
              </li>
              <li>
                <div className="no-margin" style={{padding: "0px 10px 0px 0px"}}><i className="material-icons section-one-icon" style={{color: "#f57f17"}}>group</i></div>
                <div className="no-margin no-padding">
                  <h4>教师跟踪</h4>
                  <p>Most of our free courses take fewer than 11 hours.</p>
                </div>
              </li>
              <li>
                <div className="no-margin" style={{padding: "0px 10px 0px 0px"}}><i className="material-icons section-one-icon" style={{color: "#ea80fc"}}>import_contacts</i></div>
                <div className="no-margin no-padding">
                  <h4>丰富的绘本资源</h4>
                  <p>Our global community of coaches, advisors, and graduates means there’s always someone to answer your question.</p>
                </div>
              </li>
            </ul>
            <div className="section-one-button no-padding no-margin">
              <a onClick={signup} className="clickable">点击开始</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section-two" style={{display: "none"}}>
        <div className="section-two-first-div">
          <img src={circle} alt="circle-bg" className="floating-circle" />
          <div className="computer-left">
            <img src={computer} alt="computer-img" />
          </div>
          <div>
            <h3 className="title-style">所有教学均为线上教学</h3>
            <p>Our online coding tutorials with easy-to-follow instructions, immediate feedback, and a tested curriculum take anyone from non-technical to “I can code.”</p>
          </div>
        </div>
      </section>
      <div style={{display: "none"}}>
        <div>
          <h4 className="center banner-font" style={{display: "none"}}>Lighters绘说英语</h4>
          <div className="container" style={{display: "none"}}>
            <Row>
              <Col m={6} className="center advantages">
                <p>欧美英语硕士博士</p>
                <p>外语教育研究专家</p>
                <p>一线经验中教名师</p>
                <p>专业TESOL高级外教</p>
                <p>985/211英语专业八级</p>
                <p>严苛标准招聘岗前培训</p>
                <p>定期集体备课批课教研</p>
              </Col>
              <Col m={6} className="center advantages">
                <p>灵活的时间地点</p>
                <p>在家登录上课软件即可上课</p>
                <p>双方约定一周2-3次上课时间</p>
                <p>灵活的上课模式</p>
                <p>一对一私人课 (40分钟)</p>
                <p>一对多小组课 (45分钟)</p>
              </Col>
            </Row>
          </div>

          <TeachersCards />

          <div className="books-section">
            <h3 className="center title-style">原滋原味绘本教材</h3>
            <div className="center">
              <Row>
                <img style={{width: "225px", zIndex: "1"}} src={book1} alt="Yvonne冰冰老师"></img>
                <img style={{width: "225px", zIndex: "1"}} src={book2} alt="Yvonne冰冰老师"></img>
                <img style={{width: "225px", zIndex: "1"}} src={book4} alt="Yvonne冰冰老师"></img>
                <img style={{width: "225px", zIndex: "1"}} src={book3} alt="Yvonne冰冰老师"></img>
              </Row>
            </div>
          </div>
        </div>
        
        <div className="uphill-bg card-padding">
          <div className="uphill-container">
            <img src={uphill} alt="uphill" />
          </div>
          {/* <div className="vertical-bars-container">
            <img src={verticalBars} alt="vertical-bars" />
          </div> */}
          <h4 className="center black-text">准备好了嘛?</h4>
          <h5 className="center black-text">点击申请试课, 让您的孩子加入我们的绘本英语学习之旅吧.</h5>
          <br/>
          <div onClick={signup} className="center large-btn">申请试课</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home