import { status } from "../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export async function getEvent(token, id) {
  try {
    const groupData = await fetch(`${apiUrl}/api/events/${id}/`, {
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
    const groupData = await fetch(`${apiUrl}/api/bets/place_bet/`, {
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

export async function setEndPrice(token, item) {
  try {
    const groupData = await fetch(`${apiUrl}/api/events/${item.event}/set_result/`, {
      method: "PUT",
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
    const groupData = await fetch(`${apiUrl}/api/events/`, {
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
