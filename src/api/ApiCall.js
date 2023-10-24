const baseUrl = `http://192.168.0.104:8080`; 

export const apiCall = async (url, method = 'GET', body, token=undefined) => {
  console.log(token)
  
  let options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type':body instanceof FormData ? 'multipart/form-data' : 'application/json',
      ...(token && {'Authorization': `Bearer ${token}` })
    },
    ...(body && {body: body instanceof FormData ? body : JSON.stringify(body)}),
  };
  console.log(baseUrl+url,options, 'req object====');
  try {
    const response = await fetch(baseUrl + url, options);
    const data = await response.json();
    if (!response.ok) {
      console.log(response);
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default apiCall;

// export const apiCall=async ()=>{

// var raw = JSON.stringify({
//   "country": "India ",
//   "email": "rahultripathit89@gmail.com",
//   "instaUserName": "Rahultripathi",
//   "name": "Rahul tripathi ",
//   "password": "Ecbkzssh8c",
//   "role": [
//     "user",
//     "moderator"
//   ],
//   "shortBio": " I am a react native developer "
// });

// var requestOptions = {
//   method: 'POST',
//    headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: raw,
// };

// await fetch("http://192.168.0.105:8080/api/auth/signup", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }
