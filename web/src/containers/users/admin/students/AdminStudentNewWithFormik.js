// import { withFormik } from 'formik';
// import * as Yup from 'yup';
// import { connect } from 'react-redux';

// import AdminStudentNewForm from './AdminStudentNewForm';
// import { createStudent, updateStudent } from '../../../../actions/admin_actions';

// const mapDispatchToProps = dispatch => {
//   return {
//     createStudent: (student) => dispatch(createStudent(student)),
//     updateStudent: (id, student) => dispatch(updateStudent(id, student)),
//   }
// };

// const AdminStudentNewWithFormik = connect(null, mapDispatchToProps)(
//   withFormik({
//     mapPropsToValues: props => ({
//       firstname: props.student.firstname || "",
//       lastname: props.student.lastname || "",
//       englishname: props.student.englishname || "",
//       age: props.student.age || "",
//       birthday: props.student.birthday || "",
//       gender: props.student.gender || "女",
//       city: props.student.city || ""
//     }),
//     validationSchema: Yup.object().shape({
//       // firstname: Yup.string().required('此项为必填项!'),
//       // lastname: Yup.string().required('此项为必填项!'),
//       englishname: Yup.string().required('此项为必填项!'),
//       // age: Yup.string().required('此项为必填项!'),
//       // birthday: Yup.string().required('此项为必填项!'),
//       gender: Yup.string().required('此项为必填项!'),
//       city: Yup.string().required('此项为必填项!'),
//     }),
//     handleSubmit: (values, { props, setSubmitting }) => {
//       setSubmitting(false);
//       props.action === "NEW" ? props.createStudent(values) : props.updateStudent(props.student._id, values);
//     }
//   })(AdminStudentNewForm)
// );

// export default AdminStudentNewWithFormik;