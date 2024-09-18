import React from 'react';

import { Row, Col, Card } from 'react-materialize';
import AudiosFile from './AudiosFile';

class AudiosFileList extends React.Component {
  render() {
    let audiosFileList = this.props.files.length > 0 ? this.props.files.map((file, idx) => {
      return <AudiosFile key={idx} file={file} report_id={this.props.report_id} removeUploadedFile={this.props.removeUploadedFile} />
    }) : 
    <Row>
      <Col m={12} s={12}>
        <Card className='white r-box-shadow' textClassName='black-text' title=''>
        <h5 className="center">当前没有上传的文件</h5>
        </Card>
      </Col>
    </Row>;

    return(
      <div>
        <div className="row">
          <div className="input-field col m12 s12 no-margin">
            <h5 className="cyan-text">已上传的文件: </h5>
              {audiosFileList}
          </div>
        </div>
      </div>
    )
  }
}

export default AudiosFileList;