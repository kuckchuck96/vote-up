import { express } from 'express';
import { path } from 'path';

const app = express();

app.use(express.static(__dirname + "/dist/vote-up"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/vote-up/index.html"));
});

app.listen(process.env.PORT || 3000);
