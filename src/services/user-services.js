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
