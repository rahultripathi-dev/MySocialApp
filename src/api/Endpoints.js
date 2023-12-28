export const signup=`/api/auth/signup`
export const signin=`/api/auth/signin`
export const googleLogin=`/api/auth/google/login`
export const uploads=`/uploads`
export const countries='/api/countrydata'
export const getFeedData= '/uploads'
export const notifications= '/notification'
export const likes=(_id)=>(`/api/uploads/${_id}/likes`)
export const dislikes=(_id)=>(`/api/uploads/${_id}/dislikes`)
export const getUserData='/api/user'