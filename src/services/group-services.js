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
