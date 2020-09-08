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

getPublic();
// function uploadSingleFile() {
// 	myHeaders.append("x-auth-token", token);

// 	//Upload a single file
// 	var formdata = new FormData();
// 	formdata.append("user", user.id);
// 	formdata.append("private", "true");
// 	formdata.append("tags", '["new", "test"]');
// 	formdata.append("file", fileInput.files[0], "logo.png");

// 	var requestOptions = {
// 		method: "POST",
// 		headers: myHeaders,
// 		body: formdata,
// 		redirect: "follow",
// 	};
// }

// fetch("http://localhost:5000/api/image/uploadFile", requestOptions)
// 	.then((response) => response.text())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log("error", error));

// //Post multiple files
// var myHeaders = new Headers();
// myHeaders.append("x-auth-token", token);

// var formdata = new FormData();
// formdata.append("user", user.id);
// formdata.append("private", "true");
// formdata.append("tags", '["new", "test"]');
// formdata.append("files", fileInput.files[0], "logo.png");
// formdata.append("files", fileInput.files[0], "TwilightPhenom.jpg");

// var requestOptions = {
// 	method: "POST",
// 	headers: myHeaders,
// 	body: formdata,
// 	redirect: "follow",
// };

// fetch("http://localhost:5000/api/images/uploadFiles", requestOptions)
// 	.then((response) => response.text())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log("error", error));
