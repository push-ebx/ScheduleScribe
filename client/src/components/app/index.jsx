import "./index.scss";
import {redirect} from 'react-router-dom'
import {useEffect} from "react";

export const App = () => {
  useEffect(() => {
    redirect('/dashboard')
  }, []);
  return (
    <>
      12345
    </>
  )
};