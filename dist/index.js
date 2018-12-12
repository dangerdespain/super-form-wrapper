'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var FormTemplate = function FormTemplate(props) {
  var LoadingComponent = props.LoadingComponent,
      MutationComponent = props.MutationComponent,
      makeMutationProps = props.makeMutationProps,
      QueryComponent = props.QueryComponent,
      makeQueryProps = props.makeQueryProps,
      FormComponent = props.FormComponent,
      makeFormProps = props.makeFormProps;


  var queryProps = makeQueryProps ? makeQueryProps(props) : {};
  return React__default.createElement(
    QueryComponent,
    queryProps,
    function (queryResponse) {
      if (queryResponse && queryResponse.loading) return React__default.createElement(LoadingComponent, { message: 'loading' });
      var mutationProps = makeMutationProps ? makeMutationProps(props, queryResponse) : {};
      return React__default.createElement(
        MutationComponent,
        mutationProps,
        function (mutate, mutationResponse) {
          var formProps = makeFormProps ? makeFormProps(props, queryResponse) : {};
          return React__default.createElement(FormComponent, _extends({}, formProps, { children: function children(renderProps) {
              return props.children({ formProps: formProps, renderProps: renderProps, queryProps: queryProps, queryResponse: queryResponse, mutationProps: mutationProps, mutationResponse: mutationResponse });
            } }));
        }
      );
    }
  );
};

// anything that can and should be customized by platform lives here, along with any defaults
FormTemplate.defaultProps = {
  LoadingComponent: function LoadingComponent(_ref) {
    var children = _ref.children;
    return React__default.createElement(
      React.Fragment,
      null,
      'Loading'
    );
  },
  MutationComponent: function MutationComponent(props) {
    return props.makeMutationProps ? props.Mutation : props.children(null);
  },
  QueryComponent: function QueryComponent(props) {
    return props.makeQueryProps ? props.Query : props.children(null, null);
  },
  FormComponent: function FormComponent(props) {
    return props.makeFormProps ? props.Formik : props.children(props);
  }
};

FormTemplate.propTypes = {
  LoadingComponent: PropTypes.func,
  MutationComponent: PropTypes.func,
  makeMutationProps: PropTypes.func,
  QueryComponent: PropTypes.func,
  makeQueryProps: PropTypes.func,
  FormComponent: PropTypes.func,
  makeFormProps: PropTypes.func
};

module.exports = FormTemplate;
//# sourceMappingURL=index.js.map
