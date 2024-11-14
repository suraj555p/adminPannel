import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(()=> {
        localStorage.removeItem("token");
        navigate("/");
    }, [])
  return (
    <div>
      <h1>Logout...</h1>
    </div>
  )
}
