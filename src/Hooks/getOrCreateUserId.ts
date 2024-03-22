const getOrCreateUserId = () => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return userId;
  }

  //TODO: Change to uuid
  const newUserId = Math.random().toString(36).substring(7);
  localStorage.setItem("userId", newUserId);

  return newUserId;
};

export default getOrCreateUserId