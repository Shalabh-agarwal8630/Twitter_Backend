import { initServer } from "./app";
import * as dotenv from 'dotenv'

dotenv.config();
async function init(){
 const app=await initServer();
 app.listen(8001,()=>{
  console.log("Server started at port 8001");
 })
 app.get("/",(req,res)=>{
  res.send("welcome");
 })
}
init();