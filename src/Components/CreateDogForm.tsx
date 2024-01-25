import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDisplayDogs } from "../Providers/DogProvider";
import { Requests } from "../api";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;
export const CreateDogForm = () =>
	// no props allowed
	{
		const [name, setName] = useState("");
		const [description, setDescription] = useState("");
		const [isFavorite, setIsFavorite] = useState(false);
		const [image, setImage] = useState(defaultSelectedImage);
		const [isLoading, setIsLoading] = useState(false);

		const { refetch } = useDisplayDogs();

		const refreshForm = () => {
			setName("");
			setDescription("");
			setImage(defaultSelectedImage);
			setIsFavorite(false);
		};

		/*Not sure what benefits creating a postDog function in the provider file has over just using the fetch request here.
		Id have to pass state for all the values in the form from the provider file, which seems to go against the idea of minimizing passing state.
		Since these state values are only used in this component, it seems like it would be better to just keep the refresh form function and its respected state values here.
		But maybe im just not getting how to do it the other way.*/

		const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setIsLoading(true);
			Requests.postDog({ name, description, image, isFavorite })
				.then(() => {
					refreshForm();
					toast.success(
						"Thank you for bringing this pup into the World! 🐶 woof!"
					);
				})
				.catch(() => toast.error("Congrats, you broke it! 🐶 woof!"))
				.finally(() => {
					refetch();
					setIsLoading(false);
				});
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
