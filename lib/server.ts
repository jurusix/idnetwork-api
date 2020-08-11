import App from "./app";
const port = 3000;

App.express.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("Express server listening on port " + port);
});
