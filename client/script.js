let token = "";
let user = "";
const publicFeed = document.getElementById("gallery");
function login() {
	//Login
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ email: "test@test.ca", password: "password" });

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch("http://localhost:5000/api/login/", requestOptions)
		.then((response) => response.text())
		.then((result) => {
			token = result.token;
			user = result.user;
			console.log(result);
		})
		.catch((error) => console.log("error", error));
}

function getPublic() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ email: "test@test.ca", password: "password" });

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch("http://localhost:5000/api/images/public", requestOptions)
		.then((response) => response.text())
		.then((urls) => {
			addImages(urls);
		})
		.catch((error) => console.log("error", error));
}

function getPrivate() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ email: "test@test.ca", password: "password" });

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch("http://localhost:5000/api/images/authenticated", requestOptions)
		.then((response) => response.text())
		.then((images) => {
			return images;
		})
		.catch((error) => console.log("error", error));
}

function addImage(imageUrl) {
	const img = document.createElement("img");
	img.src = imageUrl;
	publicFeed.append(img);
}

function addImages(images) {
	images.forEach((imageUrl) => addImage(imageUrl));
	console.log(publicFeed);
}
