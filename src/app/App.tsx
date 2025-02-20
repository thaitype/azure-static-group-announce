import { useRef, useState } from 'react';
import { api } from "~/trpc/react";
import './App.css';
import { trpc } from '~/trpc/api';
import { Toaster, toast } from "sonner";

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const userIdRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {

    if (!userIdRef.current) {
      return;
    }
    const userId = userIdRef.current.value;
    console.log(`Submit: ${userId}`);

    if(!userId) {
      return toast.error('Please enter a ID');
    }

    try{
      setLoading(true);
      const res = await trpc.home.showGroup.query({ userId });
      if(res.status === 'error') {
        return toast.error(`Error: ${res.message}`);
      }
      if(!res.found) {
        return toast.error('Error: User not found');
      }
      console.log(`Name: ${res.name} at Group: ${res.group}`);
    } catch (err) {
      console.error(err);
      toast.error('Error: Fetch Error');
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <div className='container'>
        <h2>Group Annoucement</h2>
        <input type="text" name="userInput" placeholder="Enter Your ID" ref={userIdRef} />
        <button onClick={handleSubmit} disabled={loading}>{
          loading ? 'Loading...' : 'Submit'
          }</button>
        <Toaster richColors duration={2000} position="bottom-center" />
      </div>
  
    </>
  );
}

export default App;
