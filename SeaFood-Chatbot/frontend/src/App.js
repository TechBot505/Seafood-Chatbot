// import axios from 'axios';
// import { useState } from 'react';

import Chatbot from './components/Chatbot';


function App() {

  // const [query,setQuery]=useState("");
  // const [response,setResponse]= useState("");

  // const handleSubmit = (e)=> {
  //   e.preventDefault();

  //   axios.post("http://localhost:3000/chat",{query}).then((res)=>{
  //     setResponse(res.data)
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // }

  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p> */}

      <div>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
