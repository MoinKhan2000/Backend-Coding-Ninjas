import path from "path";
export const getProducts = (req, res) => {
  res.sendFile(path.resolve("src", "views", "index.html"));
};
