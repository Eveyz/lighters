import React, { useEffect, useState } from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Loading from '../../components/Loading'
import { getLocalDate } from '../../ultis'

const ViewEvaluation = (props) => {

  const [loading, setLoading] = useState(true)
  const [img, setImg] = useState(false)
  const [evaluation, setEvaluation] = useState(null)
  
  useEffect(() => {
    axios.get(`/evaluations/${props.match.params._id}`).then((response) => {
			setEvaluation(response.data)
			setLoading(false)
    }).catch((err) => {
      console.log("Cannot get evaluation")
    })
  })

  const downloadReport = () => {
    const evaluation_name = `评测-${getLocalDate(evaluation.date)}.png`;
    html2canvas(document.querySelector("#evaluation_content")).then(canvas => {
      document.querySelector("#evaluation_img").appendChild(canvas)
      var a = document.createElement('a');
      a.href = canvas.toDataURL()
      a.download = evaluation_name
      a.click();
      setImg(true)
    });
  }
	
	if(loading) {
		return <Loading />
	}

	const btn = img ? <div>已生成报告图片, 如果没有开始自动下载, 请右键点击报告保存图片</div> : <button className="btn" onClick={downloadReport}><i className="material-icons left">cloud_download</i>下载报告</button>

	const _evaluation = img ? "" :
	<div id="evaluation_content">
		<div className="card r-box-shadow report-border">
			<div className="card-content" style={{padding: "5px"}}>
				<div className="row no-margin">
					<div className="input-field col m12 s12">
						<h4 className="center orange-text no-margin">Lighters 绘说英语 - 评测</h4>
						<br/>
						<p><span className="orange-text">评测时间:</span> {getLocalDate(evaluation.date)} </p>
						<p><span className="orange-text">评测等级:</span> {evaluation.level} </p>
						<br />
						<h5 className="orange-text">综合评语</h5>
						<div dangerouslySetInnerHTML={{__html: evaluation.content}} />
						<br/>
						<h5 className="center orange-text">希望你可以每天听音频, 跟读原文录音!</h5>
						<h5 className="center orange-text">相信如此坚持下来, 肯定会见到美丽的彩虹!</h5>
					</div>
				</div>
			</div>
		</div>
	</div>

	return (
		<div className="page-min-height">
			<Header />
				<div className="row no-margin">
					<div className="input-field col m6 s12 offset-m3">
						<br/>
						{btn}
						<br/>
						<div id="evaluation_img"></div>
						{_evaluation}
					</div>
				</div>
			<Footer />
		</div>
	)
}

export default ViewEvaluation;