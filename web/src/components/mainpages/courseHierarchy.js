import React from 'react';
import '../../css/mainpages.css';
import { Table } from 'react-materialize';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const CourseHierarchy = props => (
  <div>
    <Header />
    <h4 className="center banner-font">我们的课程体系</h4>
    <div className="container">
      <Table className="centered tbl">
        <thead>
          <tr className="cell-style head">
            <th>Lighters绘说英语</th>
            <th>
              <p className="no-margin">启蒙</p>
              <p className="no-margin">easystarter</p>
            </th>
            <th>
              <p className="no-margin">起步</p>
              <p className="no-margin">beginner</p>
            </th>
            <th>
              <p className="no-margin">初级上</p>
              <p className="no-margin">pre-elementary</p>
            </th>
            <th>
              <p className="no-margin">初级下</p>
              <p className="no-margin">elementary</p>
            </th>
            <th>
              <p className="no-margin">中级上</p>
              <p className="no-margin">pre-intermediate</p>
            </th>
            <th>
              <p className="no-margin">中级下</p>
              <p className="no-margin">intermediate</p>
            </th>
            <th>
              <p className="no-margin">中高级</p>
              <p className="no-margin">upper-intermediate</p>
            </th>
            <th>
              <p className="no-margin">高级</p>
              <p className="no-margin">advanced</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="cell-style pc">
            <td>RAZ等级</td>
            <td>aa-A</td>
            <td>B-C</td>
            <td>D-F</td>
            <td>G-J</td>
            <td>K-M</td>
            <td>N-P</td>
            <td>Q-T</td>
            <td>U-Z<sup>+</sup></td>
          </tr>
          <tr className="cell-style yc">
            <td>蓝思等级</td>
            <td>BR-70L</td>
            <td>BR-70L</td>
            <td>80-300L</td>
            <td>300-450L</td>
            <td>450-600L</td>
            <td>550-650L</td>
            <td>650-770L</td>
            <td>770-1100L</td>
          </tr>
          <tr className="cell-style gc">
            <td>中国年级</td>
            <td>学龄前</td>
            <td>小学G1-G2</td>
            <td>小学G3-G5</td>
            <td>小学G5-G6</td>
            <td>初中G1-G2</td>
            <td>初中G3</td>
            <td>高中G1-G2</td>
            <td>高中G3-大学</td>
          </tr>
          <tr className="cell-style purc">
            <td>美国年级</td>
            <td>美幼稚园</td>
            <td>美K</td>
            <td>美G1</td>
            <td>美G1</td>
            <td>美G2</td>
            <td>美G2</td>
            <td>美国G3</td>
            <td>美国G4-5</td>
          </tr>
          <tr className="cell-style bc">
            <td><b>培养能力</b></td>
            <td colSpan="2">
              <p>听说基础</p>
              <p>字母认知</p>
              <p>拼读意识</p>
              <p>语言学习兴趣</p>
            </td>
            <td colSpan="2">
              <p>日常沟通</p>
              <p>拼读能力</p>
              <p>词根词缀意识</p>
              <p>基础句型表达</p>
            </td>
            <td colSpan="2">
              <p>沟通表达观点</p>
              <p>独立阅读能力</p>
              <p>词根词缀背单词</p>
              <p>语法和分析能力</p>
              <p>基础体裁写作</p>
            </td>
            <td colSpan="2">
              <p>研究/思辨能力</p>
              <p>观点表达/辩论</p>
              <p>各类体裁写作</p>
              <p>数字/创意写作</p>
              <p>演讲展示能力</p>
            </td>
          </tr>
          <tr className="cell-style blue-grey darken-3">
            <td><b>课程内容</b></td>
            <td colSpan="2">
              <p>自然拼读</p>
              <p>动画视频</p>
              <p>图画多分级绘本</p>
              <p>图画多名家绘本</p>
            </td>
            <td colSpan="2">
              <p>文字多分级绘本</p>
              <p>文字多名家绘本</p>
              <p>本土漫画</p>
              <p>原声视频</p>
              <p>入门科普读物</p>
            </td>
            <td colSpan="2">
              <p>桥梁初中章小说</p>
              <p>中级科普读物</p>
              <p>写作入门</p>
              <p>各类题材读物</p>
              <p>(新闻社科传记)</p>
            </td>
            <td colSpan="2">
              <p>高级章节小说</p>
              <p>经典名著阅读</p>
              <p>自然历史社科</p>
              <p>社论新闻</p>
              <p>高级写作</p>
              <p>公共演讲与展示</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
    <br/>
    <br/>
    <Footer />
  </div>
)

export default CourseHierarchy;
