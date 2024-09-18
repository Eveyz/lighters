import React from 'react';
import ReactQuill from 'react-quill';

class QuillTextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: props.value || '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html })
    this.props.onChange(`${this.props.name}`, this.state.editorHtml)
  }

  render() {
    return (
      <ReactQuill
        id={this.props.id}
        value={this.state.editorHtml}
        onChange={this.handleChange}
        modules={QuillTextEditor.modules}
      />
    )
  }
}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

QuillTextEditor.modules = {
  toolbar: toolbarOptions
}

QuillTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]

export default QuillTextEditor;