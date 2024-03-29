import { status } from "../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export async function auth(credentials) {
  try {
    const authData = await fetch(`${apiUrl}/api/authenticate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    })
    return await status(authData);
  } catch (err) {
    console.log(err);
  }
}

export async function register(userData) {
  try {
    const authData = await fetch(`${apiUrl}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    return await status(authData);
  } catch (err) {
    console.log(err);
  }
}

export async function changePassword(userData, userId, token) {
  try {
    const authData = await fetch(`${apiUrl}/api/users/${userId}/change_password/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(userData)
    })
    return await status(authData)
  } catch (err) {
    console.log(err);
  }
}

export async function uploadProfilePic(token, profileId, data) {
  try {
    const authData = await fetch(`${apiUrl}/api/profile/${profileId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(data)
    })
    return await status(authData)
  } catch (err) {
    console.log(err);
  }
}
