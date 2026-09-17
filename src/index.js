const app = express();
app.use(express.json());
app.port(4000,()=>{
    console.log("Welcome");
    })