// import { withFormik } from 'formik';
// import * as Yup from 'yup';
// import { connect } from 'react-redux';

// import TeacherForm from './TeacherForm';
// import { addTeacher, updateTeacher } from '../../actions/teachers_actions';

// const mapDispatchToProps = dispatch => {
//   return {
//     addTeacher: (teacher) => dispatch(addTeacher(teacher)),
//     updateTeacher: (teacher) => dispatch(updateTeacher(teacher))
//   }
// };

// const TeacherwithFormik = connect(null, mapDispatchToProps)(
//   withFormik({
//     mapPropsToValues: props => ({
//       firstname: props.teacher.firstname || "",
//       lastname: props.teacher.lastname || "",
//       englishname: props.teacher.englishname || "",
//       age: props.teacher.age || "",
//       birthday: props.teacher.birthday || "",
//       gender: props.teacher.gender || "",
//       city: props.teacher.city || "",
//       work: props.teacher.work || "",
//       education: props.teacher.education || "",
//       experience: props.teacher.experience || "",
//       profour: props.teacher.profour || "",
//       proeight: props.teacher.proeight || "",
//       levelsix: props.teacher.levelsix || "",
//       other: props.teacher.other || "",
//       honor: props.teacher.honor || "",
//       interaction: props.teacher.interaction || "",
//       like: props.teacher.like || "",
//       availabletime: props.teacher.availabletime || "",
//       comments: props.teacher.comments || "",
//       file: null,
//       story: null,
//       certificates: null,
//     }),
//     validationSchema: Yup.object().shape({
//       firstname: Yup.string().required('此项为必填项!'),
//       lastname: Yup.string().required('此项为必填项!'),
//       englishname: Yup.string().required('此项为必填项!'),
//       age: Yup.string().required('此项为必填项!'),
//       birthday: Yup.string().required('此项为必填项!'),
//       gender: Yup.string().required('此项为必填项!'),
//       city: Yup.string().required('此项为必填项!'),
//       work: Yup.string().required('此项为必填项!'),
//       education: Yup.string().required('此项为必填项!'),
//       experience: Yup.string().required('此项为必填项!'),
//       otherexperience: Yup.string().required('此项为必填项!'),
//       file: Yup.mixed()
//           .test(
//             "绘本文件格式",
//             "请选择pdf文件",
//             value => value ? value && ["application/pdf"].includes(value.type) : true
//           )
//     }),
//     handleSubmit: (values, { props, setSubmitting }) => {
//       setSubmitting(false);
//       props.action === "NEW" ? props.addTeacher(values) : props.updateTeacher(values);
//     }
//   })(TeacherForm)
// );

// export default TeacherwithFormik;