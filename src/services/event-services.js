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

export async function placeBet(token, item) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/bets/place_bet/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(item)
    });
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}

export async function createEvent(token, data) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(data)
    });
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}
