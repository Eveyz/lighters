import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import BookForm from './bookForm';
import { addBook, updateBook } from '../../actions/books_actions';

const mapDispatchToProps = dispatch => {
  return {
    addBook: (book) => dispatch(addBook(book)),
    updateBook: (book) => dispatch(updateBook(book))
  }
};

const BookwithFormik = connect(null, mapDispatchToProps)(
  withFormik({
    mapPropsToValues: props => ({
      lightersLevel: props.book.lightersLevel || "",
      americanGrade: props.book.americanGrade || "",
      razLevel: props.book.razLevel || "",
      lexileLevel: props.book.lexileLevel || "",
      age: props.book.age || "",
      category: props.book.category || "",
      serials: props.book.serials || "",
      name: props.book.name || "",
      audioLink: props.book.audioLink || "",
      file: props.book.file || "",
    }),
    validationSchema: Yup.object().shape({
      lightersLevel: Yup.string().required('此项为必填项!'),
      americanGrade: Yup.string().required('此项为必填项!'),
      razLevel: Yup.string().required('此项为必填项!'),
      lexileLevel: Yup.string().required('此项为必填项!'),
      age: Yup.string().required('此项为必填项!'),
      category: Yup.string().required('此项为必填项!'),
      serials: Yup.string().required('此项为必填项!'),
      name: Yup.string().required('此项为必填项!'),
      // audioLink: Yup.string().required('此项为必填项!'),
      // file: Yup.mixed()
      //     .test(
      //       "绘本文件格式",
      //       "请选择pdf文件",
      //       value => value ? value && ["application/pdf"].includes(value.type) : true
      //     )
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(false);
      values.id = props.book._id;
      if(props.prevFile) {
        values.prevFile = props.prevFile
      }
      props.action === "NEW" ? props.addBook(values) : props.updateBook(values);
    }
  })(BookForm)
);

export default BookwithFormik;