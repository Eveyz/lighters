import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, context, ...rest }) => (
  <Route {...rest} render={(props) => (
    context.auth === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export const AdminRoute = ({component: Component, context, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return context.auth && context.current_user.userTokenData.identity === "admin" 
    ? context.current_user.exp - (dateNow.getTime()/1000) >= 0 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)

export const TeacherRoute = ({component: Component, context, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return context.auth && context.current_user.userTokenData.identity === "teacher" 
    ? context.current_user.exp - (dateNow.getTime()/1000) >= 0 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)

export const StudentRoute = ({component: Component, context, ...rest}) => (
  <Route {...rest} render={(props) => {
    const dateNow = new Date()
    return context.auth && context.current_user.userTokenData.identity === "student" 
    ? context.current_user.exp - (dateNow.getTime()/1000) >= 0 
    ? <Component {...props} /> : <Redirect to='/login' /> 
    : <Redirect to='/' />
  }} />
)