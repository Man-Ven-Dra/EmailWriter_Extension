import Home from "./components/Home"
import {Provider} from "react-redux"
import store from "./utils/store"
function App() {
  return (
    <Provider store={store}>
      <div className="w-[22rem] h-[25rem] border-2">
        <Home/>
      </div>
    </Provider>
  )
}

export default App
