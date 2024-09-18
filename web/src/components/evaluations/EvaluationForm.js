import React, { useRef, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import M from 'materialize-css';
import FormTextarea from '../../containers/forms/FormTextarea';
import { getLocalDateFormat } from '../../ultis'

import Loading from '../../components/Loading'

const EvaluationForm = props => {

  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")

	const nameInput = useRef(null)
  const dateInput = useRef(null)
  const levelInput = useRef(null)

	useEffect(() => {
		M.updateTextFields()
	})

	const handleSubmit = (e) => {
    e.preventDefault();
		var _content = content
		if(props.action === "EDIT" && content === "") {
			_content = props.evaluation.content
		}
    const evaluation = {
      name: nameInput.current.value,
      level: levelInput.current.value,
      date: dateInput.current.value,
      content: _content,
			student_id: props.student_id
    };
		props.handleSubmit(evaluation);
  }

	let nameVal = "";

	const getInputData = (field, val) => {
		setContent(val)
	}

	const handleCancel = () => {
		props.handleCancel()
	}

  return (
    <Grid>
      {
        isLoading ?
        <Loading /> :
				<div>
					<div className='row'>
						<div className="col input-field s4">
							<input type="date" defaultValue={props.action === "ADD" ? "" : getLocalDateFormat(props.evaluation.date)} ref={dateInput} id="date" />
							<label htmlFor="date">评测日期</label>
						</div>
						<div className="col input-field s4">
							<input type="text" defaultValue={props.action === "ADD" ? "" : props.evaluation.level} ref={levelInput} id="level" />
							<label htmlFor="level">评测等级</label>
						</div>
						<div className="col input-field s4">
							<input type="text" defaultValue={props.action === "ADD" ? "" : props.evaluation.name} ref={nameInput} id="name" />
							<label htmlFor="name">评测人</label>
						</div>
					</div>
					<FormTextarea
						classes="input-field col m12 s12"
						name="content"
						label="综合评语"
						required={true}
						errorMsg="请填写评语"
						getInputData={getInputData}
						action={props.action}
						value={props.action === "ADD" ? "" : props.evaluation.content}
					/>
					<button className="btn" onClick={handleSubmit}>提交</button>
					<button onClick={handleCancel} className="btn white black-text right">取消</button>
				</div>
      }
    </Grid>
  )
}

export default EvaluationForm