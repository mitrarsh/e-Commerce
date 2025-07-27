import React from 'react'
import { redirect } from 'react-router-dom';

// async function fetchProtectedData(){
//     const token = localStorage.getItem("token");
// const response = await fetch("http://localhost:3000/protected", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`
//   }
// });
// if(!response.ok){
//     if (response.status===401)
//         {localStorage.removeItem('token')}
//     throw new Error('failed to fetch protected data');
//     return redirect('login')
// }
//   const data = await response.json();
//   console.log(data);
// }

const UserDashboard = () => {

    const {token, user,logout}= useAuth();
    React.useEffect(()=>{
        if (!token) return redirect('/login');
        
        
    })
    
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard