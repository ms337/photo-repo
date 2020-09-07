const config = require("config");
const jwt = require("jsonwebtoken");

//Middleware function
function auth(req, res, next) {
	const token = req.header("x-auth-token");

	//checking if token
	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}

	try {
		//Verify the token
		const decoded = jwt.verify(token, config.get("jwtSecret"));
		//Add user to request from paylod
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ message: "Token is not valid." });
	}
}

module.exports = auth;
