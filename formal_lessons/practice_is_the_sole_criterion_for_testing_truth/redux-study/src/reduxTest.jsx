import React from 'react'
import { connect } from './store/connectValue'

function reduxTest(props) {
  return (
    <div>
      {props.counter.count}
      <button
        onClick={() => {
          props.handlePlus()
        }}
      >
        +
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlePlus(e) {
    const action = { type: 'ADD_COUNT' }
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxTest)
