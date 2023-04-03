import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Suggestion(args) {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate("/w/" + args.text)} className='cursor-pointer' >{args.text}</div>
  )
}
