import "./lib/db";
import server from "./network"

const PORT = process.env.PORT || 3333

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});