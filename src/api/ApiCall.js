export const baseIP='192.168.1.22'
const baseUrl = `http://${baseIP}:8080`; 

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
  // console.log(baseUrl+url,options, 'req object====');
  try {
    const response = await fetch(baseUrl + url, options);
    const data = await response.json();
    if (!response.ok) {
      console.log(JSON.stringify(response));
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

export default apiCall;


