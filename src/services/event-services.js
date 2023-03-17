import { status } from "../utils";

export async function getEvent(token, id) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    });
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}
