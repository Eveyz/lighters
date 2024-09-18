import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EvaluationForm from '../../components/evaluations/EvaluationForm'
import axios from 'axios'
import {getLocalDate} from '../../ultis'

function StudentEvaluation(props) {

	const [show, setShow] = useState(false)
	const [action, setAction] = useState("ADD")
	const [evaluation, setEvaluation] = useState(null)
	const [evaluations, setEvaluations] = useState(props.evaluations)

	const handleCancel = () => {
		setShow(false)
	}

	const handleShow = () => {
		setShow(true)
	}

	const handleSubmit = (_evaluation) => {
		if(action === "ADD") {
			axios.post(`/evaluations/all`, _evaluation)
			.then(res => {
				setEvaluations(res.data)
				setShow(false)
			})
			.catch(err => {
				console.log(err)
			})
		} else {
			axios.put(`/evaluations/${evaluation._id}`, _evaluation)
			.then(res => {
				setEvaluations(res.data)
				setAction("ADD")
				setShow(false)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}

	const handleEdit = (evaluation) => e => {
		setEvaluation(evaluation)
		setAction("EDIT")
		setShow(true)
	}

	const deleteEvaluation = (id) => {
		axios.delete(`/evaluations/${id}?student_id=${props.student._id}`)
		.then(res => {
			setEvaluations(res.data)
		})
		.catch(err => {
			console.log(err)
		})
	}

	const form = <EvaluationForm action={action} handleSubmit={handleSubmit} evaluation={evaluation} handleCancel={handleCancel} student_id={props.student._id} />

	let evaluations_history = <h5 className="center">没有评测记录</h5>

	if(evaluations.length > 0) {
    var evaluations_list = []
    evaluations.forEach((evaluation, idx) => {
      evaluations_list.push(<tr key={`evaluation-${idx}`}>
															<td>{getLocalDate(evaluation.date)}</td>
															<td>{evaluation.level}</td>
															<td>{evaluation.name}</td>
															<td><Link target="_blank" to={`/evaluations/${evaluation._id}`} className="btn">查看</Link> <button className="btn blue" onClick={handleEdit(evaluation)}>编辑</button> <button className="btn red" onClick={() => {if (window.confirm('确认要删除评测嘛?')) deleteEvaluation(evaluation._id)}}>删除</button></td>
														</tr>)
    })
    evaluations_history = <table className="highlight">
														<thead>
															<tr>
																<th>评测日期</th>
																<th>等级</th>
																<th>评测人</th>
																<th>操作</th>
															</tr>
														</thead>

														<tbody>
															{evaluations_list}
														</tbody>
													</table>
  }

	const body = show ?
							form
							:
							<div>
								<button className="btn" onClick={handleShow}>添加评测记录</button>
								{evaluations_history}
							</div>

	return (
		<div>
			<div className="col s12 m12">
				<div className="card r-box-shadow">
					<div className="card-content">
						<span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>评测记录</b></span>
						{body}
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentEvaluation

