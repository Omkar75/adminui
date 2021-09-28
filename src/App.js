import React, { useState, useEffect } from "react";
import AdminPanel from './components/AdminPanel/AdminPanel';
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching data: ", error);
          setError(error);
        }
      );
    }, []);
    if (loading) return "Loading...";
    if (error) return "Error!";
  return (
    <div>
      <AdminPanel data ={data}/>
    </div>
  );
}

export default App;
