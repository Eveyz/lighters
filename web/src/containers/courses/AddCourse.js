import React from 'react';

import '../../css/App.css';
import CourseForm from './CourseForm';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';

const AddCourse = props => {
  return (
    <div>
      <Header />
      <div className="bg-light-grey page-min-height">
        <Breadcrumb action="addCourse"/>

        <div className="container">
          <br/>
          <div className="row">
            <div className="col m12">
              <CourseForm type="ADD" />
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AddCourse

// class CourseList extends React.Component {
  
//   render() {
//     return (
//       <div>
//         <Header />
//         <div className="bg-light-grey page-min-height">
//           <Breadcrumb action="addCourse"/>

//           <div className="container">
//             <br/>
//             <div className="row">
//               <div className="col m12">
//                 <CourseForm type="ADD" />
//               </div>
//             </div>

//           </div>
//         </div>
//         <Footer/>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     courses: state.courses
//   };
// }

// // Any thing returned from this function will end up as props on the BookList component
// const mapDispatchToProps = dispatch => {
//   // Whenever search is called, the result should be passed to all reducers
//   return {
//     addCourse: () => dispatch(addCourse()),
//     deleteCourse: () => dispatch(deleteCourse())
//   }; // this.props.doSearch will become the result of headSearch
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CourseList);