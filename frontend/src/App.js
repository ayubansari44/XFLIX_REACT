// // import logo from './logo.svg';
// import './App.css';
// // import Landing from './Components/Landing';
// import Header from './Components/Header';

// function App() {
//   return (
//     <div className="App">
//       <h1>thui is test</h1>
//       {/* <Header/> */}
//       <Header/>
//     </div>
//   );
// }

// export default App;

import React from "react";
import VideoGrid from "./components/VideoGrid";
import VideoDetails from "./components/VideoDetails";
import { Route, Switch } from "react-router-dom";
import "./App.css";

export const config = {
  endpoint: `https://6bb9cc0e-1287-4583-a96d-045962131fc6.mock.pstmn.io//v1`,
};

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={VideoGrid}/>
        <Route exact path="/video/:id" component={VideoDetails}/>
      </Switch>
    </div>
  );
}

export default App;
