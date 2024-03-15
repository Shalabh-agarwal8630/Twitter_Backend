import { initServer } from "./app";

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