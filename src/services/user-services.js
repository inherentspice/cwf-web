export async function auth(credentials) {
  try {
    const authData = await fetch("http://127.0.0.1:8000/api/authenticate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    })
    return await authData.json()
  } catch (err) {
    console.log(err);
  }
}

export async function register(userData) {
  try {
    const authData = await fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    return await authData.json()
  } catch (err) {
    console.log(err);
  }
}

export async function uploadProfilePic(profileId, data) {
  try {
    const authData = await fetch(`http://127.0.0.1:8000/api/profile/${profileId}/`, {
      method: "PUT",
      body: data
    })
    return await authData.json()
  } catch (err) {
    console.log(err);
  }
}
