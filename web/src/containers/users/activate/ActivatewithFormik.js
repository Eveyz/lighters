// import { withFormik } from 'formik';
// import * as Yup from 'yup';
// import { connect } from 'react-redux';

// import ActivateForm from './ActivateForm';
// import { activate } from '../../../actions/users_actions';

// const mapDispatchToProps = dispatch => {
//   return {
//     activate: (user) => dispatch(activate(user))
//   }
// };

// const ActivatewithFormik = connect(null, mapDispatchToProps)(
//   withFormik({
//     mapPropsToValues: props => ({
//       email: "",
//       password: "",
//       passwordCon: "",
//       id: props.id
//     }),
//     validationSchema: Yup.object().shape({
//       email: Yup.string().email('邮箱格式不正确!').required('此项为必填项!'),
//       password: Yup.string().min(6, '密码长度至少为6位').required('密码不能为空'),
//       passwordCon: Yup.string().oneOf([Yup.ref('password')], '密码不对应').required('请确认密码')
//     }),
//     handleSubmit: (values, { props, setSubmitting }) => {
//       setSubmitting(false);
//       props.activate(values);
//     }
//   })(ActivateForm)
// );

// export default ActivatewithFormik;