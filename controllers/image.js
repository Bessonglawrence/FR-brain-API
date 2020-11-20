const Clarifai = require('clarifai')

//You must add your  API key for clarifai
const app = new Clarifai.App({
 apiKey: 'fb81bef2ed8546419ef0827c86223854'
});
const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data =>{
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) =>{
	const { id }= req.body;
	db('users').where('id', '=', id )
	.increment('entries', 1)
	.select('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to add entry'))
}
module.exports ={
	handleImage,
	handleApiCall
}