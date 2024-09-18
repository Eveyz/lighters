import React from 'react';

// import { connect } from 'react-redux';
// import { removeUploadedFile } from '../../actions/reports_actions';

const AudiosFile = props => {

  const removeUploadedFile = () => {
    props.removeUploadedFile(props.file, props.report_id);
  }

  const iconStyle = {
    fontSize: "60px",
    padding: "40px 40px 20px 40px"
  };

  return(
    <div className="r-box-shadow" style={{display: "inline-block", borderRadius: "10px", position: "relative", marginRight: "10px"}}>
      <i className="material-icons" style={iconStyle}>insert_drive_file</i>
      <p className="center">{this.props.file.originalname}</p>
      <i className="material-icons close-icon-style" 
        onClick={removeUploadedFile}
      >close</i>
      <br/>
    </div>
  )
}

export default AudiosFile

// class AudiosFile extends React.Component {
//   constructor(props) {
//     super(props);

//     this.removeUploadedFile = this.removeUploadedFile.bind(this);
//   }

//   removeUploadedFile = () => {
//     this.props.removeUploadedFile(this.props.file, this.props.report_id);
//   }

//   render() {
//     const iconStyle = {
//       fontSize: "60px",
//       padding: "40px 40px 20px 40px"
//     };

//     return(
//       <div className="r-box-shadow" style={{display: "inline-block", borderRadius: "10px", position: "relative", marginRight: "10px"}}>
//         <i className="material-icons" style={iconStyle}>insert_drive_file</i>
//         <p className="center">{this.props.file.originalname}</p>
//         <i className="material-icons close-icon-style" 
//           onClick={this.removeUploadedFile}
//         >close</i>
//         <br/>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     report_id: state.reportsData.currentReport._id
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeUploadedFile: (file, report_id) => dispatch(removeUploadedFile(file, report_id))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AudiosFile);