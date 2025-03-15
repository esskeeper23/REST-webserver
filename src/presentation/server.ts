import express from 'express'
import path from 'path';



export class Server {

    private app = express();

    async start() {

        //? Middleware

        //? Public Folder
        this.app.use ( express.static('public') )

        this.app.get('*', (req, res) => {
            const indexpath = path.join( __dirname + '../../../public/index.html');
            res.sendFile(indexpath);
        })

        

        this.app.listen(3000, () => {
            console.log(`Server runing on port ${3000}`)
        })
    }

}