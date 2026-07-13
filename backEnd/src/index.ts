import express, { type Express, type  Request, type Response } from 'express'
import path from 'path'
import https from 'https'
import fs from 'fs'
import cors from 'cors'
import { fileURLToPath } from 'url'

const app = express()

const corsOptions = {
    origin: function (origin: string | undefined,callback:  (err: Error | null, allow?: boolean) => void){
         // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) {
            return callback(null, true);
        }
        
        // Check against allowed patterns
        const allowedPatterns = [
            /^https:\/\/.*\.cubyz\.com$/,  // Any subdomain of cubyz.com
            /^https:\/\/cubyz\.com$/,       // Main domain
            /^http:\/\/localhost:\d+$/,     // Any localhost port (dev)
        ];
        
        const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    console.log(req.body);

    const { name, password } = req.body;

    console.log(name);      // Username
    console.log(password);  // Password

    res.json({message:`Hello there ${name}`});
});
// API
app.get("/api/users/new",(req: Request,res : Response)=>{
    res.json({message:"yo yo yo!"});
})
app.get("/api/{*splat}",(req: Request,res: Response)=>{
    res.sendStatus(404);
})

// assets
app.use(express.static(path.join('..','frontEnd', 'dist')));
app.get("/cubyz/{*splat}",(req: Request,res: Response)=>{
    res.sendStatus(404);
})
// SPA
app.get('/{*splat}', (req: Request, res: Response) => {
  res.sendFile(path.resolve('..','frontEnd', 'dist', 'index.html'))
});

if(fs.existsSync('cert/private.key')){

    const options = {
        key: fs.readFileSync('cert/private.key'),
        cert: fs.readFileSync('cert/certificate.crt'),
    };
    const server = https.createServer(options, app);
    
    server.listen(443,()=>{
        console.log(`Backend running on ${443}`);
    })
}else{
    app.listen(3000,()=>{
        console.log(`Backend running on ${3000}`);
    })
}


