import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDisplayDogs } from "../Providers/display";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;
export const CreateDogForm = () =>
	// no props allowed
	{
		const [name, setName] = useState("");
		const [description, setDescription] = useState("");
		const [isFavorite, setIsFavorite] = useState(false);
		const [image, setImage] = useState(defaultSelectedImage);
		const [isLoading, setIsLoading] = useState(false);

		const { setAllDogs } = useDisplayDogs();
		const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setIsLoading(true);
			Requests.postDog({ name, description, image, isFavorite })
				.catch(() => console.error("Error: could not post."))
				.then(() => {
					toast.success(
						"Thank you for bringing this pup into the World! 🐶 woof!"
					);
				})
				.finally(() => {
					setIsLoading(false);
					Requests.getAllDogs()
						.then((data: Dog[]) => {
							setAllDogs(data);
						})
						.catch((error) => {
							console.log(error);
						});
				});

			setName("");
			setDescription("");
			setImage(defaultSelectedImage);
			setIsFavorite(false);
		};

		return (
			<form
				action=""
				id="create-dog-form"
				onSubmit={(e) => {
					handleSubmit(e);
				}}>
				<h4>Create a New Dog</h4>
				<label htmlFor="name">Dog Name</label>
				<input
					type="text"
					id="name"
					disabled={isLoading}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="description">Dog Description</label>
				<textarea
					id="description"
					cols={80}
					rows={10}
					disabled={isLoading}
					value={description}
					onChange={(e) => setDescription(e.target.value)}></textarea>
				<label htmlFor="picture">Select an Image</label>
				<div className="select-dog">
					<select
						id="picture"
						value={image}
						onChange={(e) => {
							setImage(e.target.value);
						}}
						disabled={isLoading}>
						{Object.entries(dogPictures).map(([label, pictureValue]) => {
							return (
								<option value={pictureValue} key={pictureValue}>
									{label}
								</option>
							);
						})}
					</select>
					<img className="doggie-image" src={image}></img>
				</div>
				<input type="submit" value="submit" disabled={isLoading} />
			</form>
		);
	};
