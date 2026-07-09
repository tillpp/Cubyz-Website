import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const port = 3000
const app = express()

const corsOptions = {
    origin: function (origin,callback){
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

// API
app.get("/api/users/new",(req,res)=>{
    res.json({message:"yo yo yo!"});
})

// assets
app.use(express.static(path.join('..','frontEnd', 'dist')));
// SPA
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve('..','frontEnd', 'dist', 'index.html'))
});


app.listen(port,()=>{
    console.log(`Backend running on ${port}`);
})


