export async function getGroup(id) {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/groups/${id}/`);
    return await groupData.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getGroups() {
  try {
    const groupData = await fetch(`http://127.0.0.1:8000/api/groups/`);
    return await groupData.json();
  } catch (err) {
    console.log(err);
  }
}
