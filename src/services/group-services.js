import { status } from "../utils";

export async function getGroup(id) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/groups/${id}/`);
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}

export async function getGroups() {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/groups/`);
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}

export async function joinGroup(data) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/members/join/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}

export async function leaveGroup(data) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/members/leave/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}

export async function postComment(token, description, group, user) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({description, group, user})
    });
    return await status(groupData);
  } catch (err) {
    console.log(err);
  }
}
