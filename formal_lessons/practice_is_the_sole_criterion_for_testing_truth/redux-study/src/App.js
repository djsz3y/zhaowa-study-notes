import Data from './data'
// , { dataObj }
import A from './mobx/A'
import ReduxTest from './reduxTest'
function App() {
  return (
    <div>
      {/* {JSON.stringify(dataObj.getData())}  */}
      <Data />
      <ReduxTest />
      <hr />
      <A />
    </div>
  )
}

export default App
