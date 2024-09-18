import React from 'react'
import { Row, Col, Card } from 'react-materialize';

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Pic from '../../images/yvonne5.jpg'

const TeacherProfile = (props) => {
  return(
    <div>
      <Header />
      <div className="container">
        <br/>
        <Row>
          <Col m={4} s={12}>
            <Card key={0} style={{height: "350px"}} className='center white r-box-shadow' textClassName='black-text' title='Yvonne冰冰老师'>
              <img className="teacher-card-img" src={Pic} alt="Yvonne冰冰老师"></img>
              <h6 className="airbnb-font">联系方式</h6>
              <p>微信号: znz1990</p>
              <p>邮箱: saiop147@lighters.com</p>
              <p>电话: 13765225647</p>
            </Card>
          </Col>
          <Col m={8} s={12}>
            <h5>Hi, 我是xx老师. 很高兴来到lighters, 希望可以教导更多的孩子告别哑巴英语.</h5>
            <br/>
            <h5 className="airbnb-font bold">个人履历</h5>
            <hr/>
            <p>美国迈阿密大学英语修辞写作博士生</p>
            <p>美国迈阿密大学商学院写作中心助理主任</p>
            <p>中山大学本科及硕士英语专业八级</p>
            <p>硕士专攻英语教育与研究</p>
            <p>博士专攻二语写作研究</p>
            <p>创英语原版阅读与写作</p>
            <p>5年少儿英语原版阅读写作教学教研经验</p>
            <p>3年教授美国本土大学生英语及商务写作</p>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default TeacherProfile