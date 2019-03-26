const handleprofile = (req,res,pdb) =>{
    const {id} = req.params;
    pdb.select('*').from('users').where({
        id:id
    }).then(user => {
        if(user.length){
            res.json(user[0])  
        }else{
            res.status(400).json('NOT FOUND') 
          }
       
     })
    .catch(err => res.status(400).json('Error getting User'))

}
module.exports={
    handleprofile:handleprofile
}