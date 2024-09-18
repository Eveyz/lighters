// import { withFormik } from 'formik';
// import * as Yup from 'yup';
// import { connect } from 'react-redux';

// import AdminTeacherNewForm from './AdminTeacherNewForm';
// import { createTeacher, updateTeacher } from '../../../../actions/admin_actions';

// const mapDispatchToProps = dispatch => {
//   return {
//     createTeacher: (teacher) => dispatch(createTeacher(teacher)),
//     updateTeacher: (id, teacher) => dispatch(updateTeacher(id, teacher))
//   }
// };

// const AdminTeacherNewWithFormik = connect(null, mapDispatchToProps)(
//   withFormik({
//     mapPropsToValues: props => ({
//       firstname: props.teacher.firstname || "",
//       lastname: props.teacher.lastname || "",
//       englishname: props.teacher.englishname || "",
//       age: props.teacher.age || "",
//       birthday: props.teacher.birthday || "",
//       gender: props.teacher.gender || "女",
//       city: props.teacher.city || ""
//     }),
//     validationSchema: Yup.object().shape({
//       firstname: Yup.string().required('此项为必填项!'),
//       lastname: Yup.string().required('此项为必填项!'),
//       gender: Yup.string().required('此项为必填项!'),
//       city: Yup.string().required('此项为必填项!'),
//     }),
//     handleSubmit: (values, { props, setSubmitting }) => {
//       setSubmitting(false);
//       props.action === "NEW" ? props.createTeacher(values) : props.updateTeacher(props.teacher._id, values);
//     }
//   })(AdminTeacherNewForm)
// );

// export default AdminTeacherNewWithFormik;