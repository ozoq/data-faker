const app = require("./server/app");
const PORT = process.env.PORT || 8080;

async function init() {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

init();
