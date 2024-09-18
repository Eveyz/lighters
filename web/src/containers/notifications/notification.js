import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Skeleton } from '@material-ui/lab'

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import Loading from '../../components/Loading';

import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Notification = props => {
	const classes = useStyles();

  const [loading, setLoading] = useState(true)
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		axios.get('/notifications/all')
		.then((res) => {
			console.log(res.data)
			setNotifications(res.data)
			setLoading(false)
		})
		.catch(err => {
			console.log(err)
		})
	}, [])

	const readNotificaton = (notification) => e => {
		axios.put(`/notifications/${notification._id}`, {
			read: true
		})
		.then((res) => {
			setNotifications(res.data)
			setLoading(false)
		})
		.catch(err => {
			console.log(err)
		})
	}

	if(loading) {
		return <Loading />
	}

	let content = <div className="col m12">
									<div className="card white r-box-shadow">
										<div className="card-content">
											<h4 className="center">没有新通知</h4>
										</div>
									</div>
								</div>

	if(notifications.length > 0) {
		content = <TableContainer component={Paper}>
								<Table className={classes.table} size="small" aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>老师</TableCell>
											<TableCell align="right">上课程数记录</TableCell>
											<TableCell align="right">操作</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{notifications.map((notification, idx) => (
											<TableRow key={idx}>
												<TableCell component="th" scope="row">
													{notification.teacher_id.lastname + notification.teacher_id.firstname}
												</TableCell>
												<TableCell align="right">{notification.count}</TableCell>
												<TableCell align="right"><button className="btn" onClick={readNotificaton(notification)} disabled={notification.read}>已读</button></TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
	}

	return (
		<div>
			<Header />
      <Breadcrumb action="notifications" />
			<br/>
			<div className="container page-min-height">
				<span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>老师已上课程数</b></span>
				{content}
			</div>
			<br/>
			<Footer />
		</div>
	)
}

export default Notification