import { useRef, useState } from 'react';
import { api } from "~/trpc/react";
import './App.css';
import { trpc } from '~/trpc/api';

function App() {
  const [count, setCount] = useState(0);
  const userIdRef = useRef<HTMLInputElement>(null);

  // const post = api.home.hello.useQuery({ text: 'world' });

  const handleSubmit = async () => {
    if (!userIdRef.current) {
      return;
    }
    const userId = userIdRef.current.value;
    console.log(`Submit: ${userId}`);
    const res = await trpc.home.showGroup.query({ userId });
    console.log(res);
  }

  return (
    <>
      <div className='container'>
        <h2>Group Annoucement</h2>
        <input type="text" name="userInput" placeholder="Enter Your ID" ref={userIdRef} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
  
    </>
  );
}

export default App;
