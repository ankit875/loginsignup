const API_BASE_URL =  'http://18.191.158.208:3001';


export const userLogin = async(data, callback) => {
  const { email, password } = data;
  try{
    let results = await fetch(`${API_BASE_URL}/user/signin`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password})
    });
    const response = await results.json();

    if(results.status === 200) callback({success: true, message: response.message});
    else throw new Error(response.message);
  }
  catch(error){
    callback({success: false, message: error.message});
    console.log(error);
  }
}

export const userSignup = async(data, callback) => {
  const { email, password, name} = data;
  try{
    let results = await fetch(`${API_BASE_URL}/user/signup`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password, name})
    });
   
    const response = await results.json();
    if(results.status === 200) callback({success: true, message: response.message});
    else throw new Error(response.message);
  }
  catch(error){
    callback({success: false, message: error.message});
    console.log(error);
  }
}

export const userForgot = async(data, callback)=>{
  const {email}= data;
  try{
    let results= await fetch(`${API_BASE_URL}/user/forgot`,{
      method: 'POST',
      headers:{
        'content-Type': 'application/json',
      },
      body: JSON.stringify({email})
    })
    const response = await results.json();
    if(results.status===200){
      callback({authorized: true, message: 'Password Reset Link sent successfully'});
    }
    else{
      callback({authorized: false, message: response.message});
    }
  }
  catch(error){
    callback({authorized: false, message: error.message});
    console.log(error);
  }
}

export const userReset = async (data, callback) =>{
  const {password, token} =data;
  console.log(data)
  try{
    let results= await fetch(`${API_BASE_URL}/user/resetpassword`,{
      method: 'POST',
      headers:{
        'content-Type': 'application/json',
      },
      body: JSON.stringify({password, token})
    })
    const response = await results.json();
    if(results.status===200) callback({authorized: true, message: 'Password Reset Successfully'});
    
    else callback({authorized: false, message: response.message});
  }
  catch(error){
    callback({authorized: false, message: 'Something went wrong'});
  }
}