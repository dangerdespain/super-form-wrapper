import React, { Fragment } from 'react-native'
import PropTypes from 'prop-types'

const FormTemplate = (props)=>{

  let { 
    LoadingComponent, 
    MutationComponent,
    makeMutationProps, 
    QueryComponent,
    makeQueryProps, 
    FormComponent,
    makeFormProps,
  } = props

  let queryProps = makeQueryProps ? makeQueryProps(props) : {}
  return (
    <QueryComponent {...queryProps}>{
      (queryResponse)=>{
        if(queryResponse && queryResponse.loading) return <LoadingComponent message='loading'/>;
        let mutationProps = makeMutationProps ? makeMutationProps(props, queryResponse) : {}
        return (<MutationComponent {...mutationProps}>{(mutate,mutationResponse)=>{
          let formProps = makeFormProps ? makeFormProps(props, queryResponse) : {}
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
  MutationComponent : (props)=>props.makeMutationProps ? props.Mutation : props.children(null),
  QueryComponent : (props)=>props.makeQueryProps ? props.Query  : props.children(null,null),
  FormComponent : (props)=>props.makeFormProps ? props.Formik : props.children(props),
}

FormTemplate.propTypes = {
  LoadingComponent : PropTypes.func, 
  MutationComponent : PropTypes.func, 
  makeMutationProps : PropTypes.func, 
  QueryComponent : PropTypes.func, 
  makeQueryProps : PropTypes.func, 
  FormComponent : PropTypes.func, 
  makeFormProps : PropTypes.func, 
}

export default FormTemplate