import { main } from "./main";

const port = process.env.PORT || 3000;

const app = main();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
