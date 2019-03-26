const handleRegister = (req,res,pdb,bcrypt) =>{
    const {email,name,password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json('incorrect Submission');
    }
    var hash = bcrypt.hashSync(password);
    pdb.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        }).into('login')
        .returning('email')
        .then(loginEmail =>{
         return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            })
            .then(user =>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
       
    .catch(err => res.status(400).json('Unable to Register'))
}
module.exports = {

    handleRegister:handleRegister
}