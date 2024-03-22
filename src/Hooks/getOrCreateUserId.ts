export const getOrCreateUserId = () => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    return userId;
  }
  const newUserId = Math.random().toString(36).substring(7);
  localStorage.setItem("userId", newUserId);
  return newUserId;
};
