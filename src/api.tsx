import { Dog } from "./types";
export const baseUrl = "http://localhost:3000";

const myHeaders = {
	"Content-Type": "application/json",
};
export const Requests = {
	// should return a promise with all dogs in the database
	getAllDogs: () => {
		return fetch(baseUrl + "/dogs", {
			method: "GET",
			headers: myHeaders,
		}).then((response) => response.json());
	},

	postDog: ({ name, image, description, isFavorite }: Omit<Dog, "id">) => {
		return fetch(baseUrl + "/dogs", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				name: name,
				image: image,
				description: description,
				isFavorite: isFavorite,
			}),
		}).then((response) => response.json());
	},

	// should delete a dog from the database
	deleteDog: (idNum: number) => {
		return fetch(baseUrl + `/dogs/${idNum}`, {
			method: "DELETE",
			headers: myHeaders,
		}).then((response) => response.json());
	},

	updateDog: (idNum: number, isFavorite: boolean) => {
		return fetch(baseUrl + `/dogs/${idNum}`, {
			method: "PATCH",
			headers: myHeaders,
			body: JSON.stringify({
				isFavorite: !isFavorite,
			}),
		}).then((response) => response.json());
	},

	// Just a dummy function for use in the playground
	dummyFunction: () => {
		console.log("dummy stuff");
	},
};
