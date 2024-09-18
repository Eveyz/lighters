import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import '../../css/mainpages.css';
import Lipin from '../../images/lipin.jpg';
import Yvonne from '../../images/yvonne5.jpg';
import Lily from '../../images/lily.jpg';
import Yan from '../../images/yan2.jpg';

const TeachersCards = props => (
  <div>
    <h3 className="center title-style">雄厚的师资力量</h3>
    <Row>
      <Col m={3} s={12}>
        <Card key={0} style={{borderTop: "3px solid #02b3e4"}} className='center white teacher-card' textClassName='black-text' title='Yvonne冰冰老师'>
          <img src={Yvonne} alt="Yvonne冰冰老师"></img>
          <p style={{marginTop: "8px"}}>美国迈阿密大学英语修辞写作博士生</p>
          <p>美国迈阿密大学商学院写作中心助理主任</p>
          <p>中山大学本科及硕士英语专业八级</p>
          <p>硕士专攻英语教育与研究</p>
          <p>博士专攻二语写作研究</p>
          <p>创英语原版阅读与写作</p>
          <p>5年少儿英语原版阅读写作教学教研经验</p>
          <p>3年教授美国本土大学生英语及商务写作</p>
        </Card>
      </Col>
      <Col m={3} s={12}>
        <Card key={1} style={{borderTop: "3px solid #02ccba"}} className='center white teacher-card' textClassName='black-text' title='Holiday老师'>
          <img src={Lipin} alt="Holiday老师"></img>
          <p style={{marginTop: "8px"}}>中山大学大学英语专业毕业</p>
          <p>英语专业八级优秀</p>
          <p>6000+ 小时一线授课经验</p>
          <p>教授1000+ K12学员</p>
          <p>曾任全国最大K12教育集团师资培训师</p>
          <p>美国正面管教协会认证学校讲师</p>
          <p>英国剑桥大学教学能力认证</p>
          <p>多年MSE考试培训经验</p>
        </Card>
      </Col>
      <Col m={3} s={12}>
        <Card key={1} style={{borderTop: "3px solid #a951ed"}} className='center white teacher-card' textClassName='black-text' title='Yan老师' >
          <img src={Yan} alt="Yan老师"></img>
          <p style={{marginTop: "8px"}}>美国迈阿密大学英语修辞写作博士生</p>
          <p>浙江大学英语应用语言学硕士专业八级</p>
          <p>5年大学英语写作中心主任经验</p>
          <p>12年大学英语(写作)教学经验</p>
          <p>10年少儿英语原版阅读教学经验</p>
          <p>熟悉美国Wonders英语教材体系</p>
          <p>现教授美国本土大学生英语写作课</p>
        </Card>
      </Col>
      <Col m={3} s={12}>
        <Card key={1} style={{borderTop: "3px solid #ffae0c"}} className='center white teacher-card' textClassName='black-text' title='Lily老师' >
          <img src={Lily} alt="Lily老师"></img>
          <p style={{marginTop: "8px"}}>香港中文大学英语翻译硕士</p>
          <p>中山大学本科英语专业八级</p>
          <p>现任厦门某大学英语教师</p>
          <p>少儿英语原版阅读教学经验</p>
        </Card>
      </Col>
    </Row>
  </div>
)

export default TeachersCards;
