import express from 'express';
import * as dotenv from 'dotenv';
import router from "./routes/index.js";
import bodyParser from 'body-parser';
import cors from 'cors';


dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/', router);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
