import { createContext, useContext, useState } from "react";


const blogContext=createContext();

export const BlogContextProvider=({children})=>{
    const[blogData,setBlogData]=useState({
        cards:[]
    });
    const [blogData1,setBlogData1]=useState({
        actions:[]
    });
    const [blogData2,setBlogData2]=useState({
        comments:[]
    });
    


    return(
        <blogContext.Provider value={{blogData,setBlogData,blogData1,setBlogData1,blogData2,setBlogData2}}>
            {children}
        </blogContext.Provider>
        
    )
}

export const useBlogContext=()=> {
    return useContext(blogContext);
  }