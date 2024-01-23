import { Dog } from "./types";
export const baseUrl = "http://localhost:3000";

const myHeaders = {
	"Content-Type": "application/json",
};
export const Requests = {
	// should return a promise with all dogs in the database
	getAllDogs: async () => {
		const response = await fetch(baseUrl + "/dogs", {
			method: "GET",
			headers: myHeaders,
		});
		return (await response.json()) as Promise<Dog[]>;
	},

	postDog: async ({
		name,
		image,
		description,
		isFavorite,
	}: Omit<Dog, "id">) => {
		const data = await fetch(baseUrl + "/dogs", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				name: name,
				image: image,
				description: description,
				isFavorite: isFavorite,
			}),
		});
		return (await data.json()) as Promise<Dog[]>;
	},

	// should delete a dog from the database
	deleteDog: async (idNum: number) => {
		const data = await fetch(baseUrl + `/dogs/${idNum}`, {
			method: "DELETE",
			headers: myHeaders,
		});
		return (await data.json()) as Promise<Dog[]>;
	},

	updateDog: async (idNum: number, isFavorite: boolean) => {
		const dog = await fetch(baseUrl + `/dogs/${idNum}`, {
			method: "PATCH",
			headers: myHeaders,
			body: JSON.stringify({
				isFavorite: !isFavorite,
			}),
		});
		return (await dog.json()) as Promise<Dog[]>;
	},

	// Just a dummy function for use in the playground
	dummyFunction: () => {
		console.log("dummy stuff");
	},
};
