const Clarifai =require('clarifai');


const app = new Clarifai.App({
    apiKey: '9238406c695944bdb2b1c22484fdc03f'
   });
   const handleapi = (req,res) =>{
       
       app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)  
       .then(data =>{
        res.json(data);
       })
       .catch(err => res.status(400).json('unable to work with api'))
   }

const handleimage = (req,res,pdb)=>{
    const { id } = req.body;
    pdb('users').where('id','=',id)
    .increment('entry',1)
    .returning('entry')
    .then(entry =>{
        res.json(entry[0]);
    } ).catch(err => res.status(400).json('unable to get entry'))
    
}
module.exports = {
    handleimage:handleimage,
    handleapi:handleapi
}