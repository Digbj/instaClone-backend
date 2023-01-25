const express = require("express")
const cors = require("cors")
const port = 8000 || process.env.PORT
const app = express() 
const fileUpload = require("express-fileupload")
const {User, Post}= require("./Schemas")
const mongoose = require("mongoose")
const path = require("path")

const uri = `mongodb+srv://Digvijaya:Digvijaya@cluster0.rmxnego.mongodb.net/test`

app.use(cors())
app.use(express.json())
app.use(fileUpload())

//Connection to mongoDB
mongoose.set('strictQuery', true)
mongoose.connect(uri, (err) => {
    if(err) {
        console.log("Connection to mongodb failed")
    }
    else console.log("Connected to mongoDB successfully")
})

//Listning port
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})


app.post("/new", (req, resp) => {
    const { name, address, description }  = req.body
    const {imgFile} = req.files
    imgFile.mv("./uploads/"+imgFile.name, async (err) => {
        if(err) {
            resp.json({message: err})
        }
        else {
            const post = new Post({
                ...{ name, address, description },
                imgFile: imgFile.name
            })
            try{
                const response = await post.save()
                resp.json({message: 'Everything is fine', response})
            }catch(e){
                resp.json({message: 'Something went wrong' , response: e })
            }
        }
    })
})

app.get("/posts", async (req, resp) => {
    resp.json({result: await Post.find()})
})

app.get("/images/:fileName", async (req, resp) => {
    console.log(`./uploads/${req.params.fileName}`)
    resp.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})