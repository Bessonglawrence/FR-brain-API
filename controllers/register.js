
const handleRegister = (req, res, db, bcrypt)=>{
	const { email, name, password } = req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const salt = 10;
	const hash = bcrypt.hashSync(password, salt);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.select('email')
		.then(loginEmail => {
			return trx('users')
			.insert({
				email: email,
				name: name,
				joined: new Date
			})
			.select('*')
			.from('users')
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
	handleRegister: handleRegister
};