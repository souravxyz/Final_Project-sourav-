export const getImageUrl = (fileName) => {
  if (!fileName) return "https://www.gravatar.com/avatar/default?s=200";
  return `https://final-project-sourav-server.onrender.com/uploads/profilePics/${fileName}`;
};
