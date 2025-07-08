export const getImageUrl = (fileName) => {
  if (!fileName) return "https://www.gravatar.com/avatar/default?s=200";
  return `http://localhost:6900/uploads/profilePics/${fileName}`;
};
