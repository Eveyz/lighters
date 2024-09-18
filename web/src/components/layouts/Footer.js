import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QRCode from '../../images/qrcode-new.jpg';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer blue-grey darken-3">
        <div className="container">
          <div className="row">
            <div className="col l4 m6 s12">
              <h5 className="white-text">Lighters</h5>
              <p className="grey-text text-lighten-4">在Lighters,我们关注每个学生的学习和成长.</p>
            </div>
            <div className="col l2 m2 s12">
              <h5 className="white-text">学习资源</h5>
              <ul>
                <li><Link to="/" className="grey-text text-lighten-3" href="#!">英英字典</Link></li>
                <li><a className="grey-text text-lighten-3" href="#!">Newsela</a></li>
              </ul>
            </div>
            <div className="col l2 m2 s12">
              <h5 className="white-text">加入我们</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">我想成为老师</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">其他工作机会</a></li>
              </ul>
            </div>
            <div className="col l4 m2 s12">
              <h5 className="white-text">关注我们的公众号</h5>
              <img src={QRCode} className="materialboxed" width="100" alt="Lighters绘说英语公众号" />
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2020 Lighters, Inc.
          <br/>
          粤ICP备20044743
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;