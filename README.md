# super-form-wrapper

> Creates a configurable component wrapper for Apollo Query and Mutation. Form Agnostic! Move Faster.

[![NPM](https://img.shields.io/npm/v/super-form-wrapper.svg)](https://www.npmjs.com/package/super-form-wrapper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save super-form-wrapper
```

## Usage

```jsx
import React, { Component } from 'react'
import { Query, Mutation } from 'apollo'

import SuperForm from 'super-form-wrapper'

class Example extends Component {
  render () {
    return (
      <SuperForm 
        queryProps={()=>({ Query })}
        makeMutationProps={(queryResponse)=>({ Mutation })}
        makeFormProps={(queryResponse, mutate, mutationResponse)=>({ Form : Formik })}
        children={({ mutationResponse })=>(
          <Fragment/>
            { ...component or form children here as a function, e.g. {(extendedProps)=><ChildComponent/>
          } }
          <Fragment/>
        )}
      />
    )
  }
}
```

## License

 © [dangerdespain](https://github.com/dangerdespain)
