import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const FormTemplate = (props)=>{

  let { 
    LoadingComponent, 
    MutationComponent,
    makeMutationProps, 
    QueryComponent,
    queryProps, 
    FormComponent,
    makeFormProps,
  } = props

  return (
    <QueryComponent {...queryProps}>{
      (queryResponse)=>{
        if(queryResponse && queryResponse.loading) return <LoadingComponent message='loading'/>;
        let mutationProps = makeMutationProps ? makeMutationProps(queryResponse) : {}
        return (<MutationComponent {...mutationProps}>{(mutate,mutationResponse)=>{
          let formProps = makeFormProps ? makeFormProps(queryResponse, mutate, mutationResponse) : {}
          return <FormComponent {...formProps} children={ renderProps => props.children(
            { formProps, renderProps, queryProps, queryResponse, mutationProps, mutationResponse }
          )}/> 
        }}</MutationComponent>)
      }
    }</QueryComponent>
  )
}


// anything that can and should be customized by platform lives here, along with any defaults
FormTemplate.defaultProps = {
  LoadingComponent : ({ children })=><Fragment>Loading</Fragment>,
  MutationComponent : (props)=>props.makeMutationProps ? props.Mutation : props.children(null,null),
  QueryComponent : (props)=>props.queryProps ? props.Query  : props.children(null),
  FormComponent : (props)=>props.makeFormProps ? props.Formik : props.children(props),
}

FormTemplate.propTypes = {
  LoadingComponent : PropTypes.func, 
  MutationComponent : PropTypes.func, 
  makeMutationProps : PropTypes.func, 
  QueryComponent : PropTypes.func, 
  queryProps : PropTypes.object, 
  FormComponent : PropTypes.func, 
  makeFormProps : PropTypes.func, 
}

export default FormTemplate