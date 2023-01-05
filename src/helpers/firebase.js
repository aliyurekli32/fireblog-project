// Import the functions you need from the SDKs you need
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import {browserSessionPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoN8OpyIei1vZszd91olOfhyQm3TEqqms",
  authDomain: "fireblog-222ac.firebaseapp.com",
  databaseURL: "https://fireblog-222ac-default-rtdb.firebaseio.com",
  projectId: "fireblog-222ac",
  storageBucket: "fireblog-222ac.appspot.com",
  messagingSenderId: "119235896787",
  appId: "1:119235896787:web:5571d52fe3c808793fbb26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()


export const auth=getAuth(app);

export const snapshotToArray=(snapshot)=> {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

export const register=async(registerEmail,registerPassword,displayName,navigate)=>{
    try {
        await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword);
        await updateProfile(auth.currentUser, { displayName: displayName });
          navigate("/");  
    } catch (error) {
        console.log(error)
    }
}

export const login=async(loginEmail,loginPassword,navigate)=>{
    try {
    const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
       navigate("/")
    } catch (error) {
        console.log(error)
    }
}




export const logout=async()=>{
    await signOut(auth);
}

//?DATA BASE SECTION


//?
export const writeUserData =async( name, content, imageUrl,id,navigate) => {
    
    await set(ref(db, 'blog/'+'cards/'+id), {
        userId: auth.currentUser.uid,
        id: id,
        title:name,
        url:imageUrl,
        content:content,
        like:false,
        
    });
    navigate("/")
  }

  export const writeComment =async(item,content) => {
    const a= new Date()
   
    await set(ref(db, 'blog/'+'comments/'+item.id+"/"+a.getTime()), {
      id:a.getTime(),
      name: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      comment: content
    });
  }



  export const writeAction =async(item) => {
    
    await set(ref(db, 'blog/'+'actions/'+item.id+'/'+auth.currentUser.uid), {
        userId: auth.currentUser.uid,
        id: item.id,
        like:!item.like
    });
  }



export const getData=async(dataBlog,setBlogData)=>{
    
     await onValue(ref(db, 'blog/cards'), (snapshot) => {
        // const data = snapshot.val();
        const data= snapshotToArray(snapshot);
        setBlogData({...dataBlog,cards:data})
      });
      
}
  
export const nextData=async(dataBlog1,setBlogData1)=>{
    await onValue(ref(db, 'blog/actions'), (snapshot) => {
      
        // const data = snapshot.val();
        const data1= snapshotToArray(snapshot);
        
        setBlogData1({...dataBlog1,actions:data1})
      });
}
export const nextData1=async(dataBlog2,setBlogData2)=>{
      await onValue(ref(db, 'blog/comments'), (snapshot) => {
      
      const data2= snapshot.val() //snapshotToArray(snapshot);
      
      setBlogData2({...dataBlog2,comments:data2})
    });
} 

export const deleteData=async(id)=>{
  var singleRef = ref(db, "blog/cards/"+id);
remove(singleRef)
  .then(function() {
 
  })
  .catch(function(error) {
  
  });
}

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });