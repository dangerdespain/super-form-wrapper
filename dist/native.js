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
      queryProps = props.queryProps,
      FormComponent = props.FormComponent,
      makeFormProps = props.makeFormProps;


  return React__default.createElement(
    QueryComponent,
    queryProps,
    function (queryResponse) {
      if (queryResponse && queryResponse.loading) return React__default.createElement(LoadingComponent, { message: 'loading' });
      var mutationProps = makeMutationProps ? makeMutationProps(queryResponse) : {};
      return React__default.createElement(
        MutationComponent,
        mutationProps,
        function (mutate, mutationResponse) {
          var formProps = makeFormProps ? makeFormProps(queryResponse, mutate, mutationResponse) : {};
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
    return props.makeMutationProps ? props.Mutation : props.children(null, null);
  },
  QueryComponent: function QueryComponent(props) {
    return props.queryProps ? props.Query : props.children(null);
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
  queryProps: PropTypes.object,
  FormComponent: PropTypes.func,
  makeFormProps: PropTypes.func
};

module.exports = FormTemplate;
//# sourceMappingURL=native.js.map
