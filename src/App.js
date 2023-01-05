
import { useEffect } from 'react';
import './App.css';
import { useBlogContext } from './contexts/BlogContext';
import { auth, getData, nextData, nextData1, onObserver } from './helpers/firebase';

import AppRouter from './routers/AppRouter';


function App() {
  const{dataBlog,setBlogData,dataBlog1,setBlogData1,dataBlog2,setBlogData2}=useBlogContext()
  useEffect(() => {
    getData(dataBlog,setBlogData)
    nextData(dataBlog1,setBlogData1)
    nextData1(dataBlog2,setBlogData2)
  }, []);
  
  

  return (
    <>
      <AppRouter/>
    </>
  );
}

export default App;
