import React from 'react';

import { Row } from 'react-materialize';
import PaginationContainer from '../../containers/PaginationContainer';
import StudentReportList from './StudentReportList';

class StudentReportListContainer extends React.Component {
  render() {
    let reportContent = <h5 className="center">当前没有课程反馈表</h5>;

    if(this.props.reports.length > 0) {
      reportContent = <PaginationContainer 
                        itemsPerPage={10} 
                        data={this.props.reports} 
                        readOnly={true} 
                      >
                        <StudentReportList />
                      </PaginationContainer>
                      
    }

    return(
      <div>
        <div className="no-margin">
          <h6>当前所有课程回馈表</h6>
          <Row>
            <div className="card white r-box-shadow">
              <div className="card-content">
                {reportContent}
              </div>
            </div>
          </Row>
        </div>
      </div>
    )
  }
}

export default StudentReportListContainer;