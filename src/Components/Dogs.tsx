import { useDisplayDogs } from "../Providers/display";
import { DogCard } from "./DogCard";
import { Requests } from "../api";

export const Dogs = () => {
	const { allDogs, activeTab, setAllDogs } = useDisplayDogs();

	const favoriteDogs = allDogs?.filter((dog) => dog.isFavorite);
	const unfavoriteDogs = allDogs?.filter((dog) => !dog.isFavorite);

	const dogsToDisplay =
		activeTab === "none"
			? allDogs
			: activeTab === "favorite"
			? favoriteDogs
			: unfavoriteDogs;

	const handleDeleteDog = (dogId: number) => {
		setAllDogs(allDogs!.filter((dog) => dog.id !== dogId));
		Requests.deleteDog(dogId) //force break
			.catch((error) => {
				console.error("Error deleting dog:", error);
				setAllDogs(allDogs);
			});
	};

	const handleIsFavorite = (dogId: number) => {
		setAllDogs(
			allDogs!.map((dog) =>
				dog.id === dogId ? { ...dog, isFavorite: !dog.isFavorite } : dog
			)
		);
		const dog = allDogs!.find((dog) => dog.id === dogId);
		if (dog) {
			Requests.updateDog(dogId, dog.isFavorite) //force break
				.catch((error) => {
					console.error("Error updating dog:", error);
					setAllDogs(allDogs);
				});
		}
	};
	return (
		<>
			{dogsToDisplay?.map((dog) => (
				<DogCard
					dog={dog}
					key={dog.id}
					isLoading={false}
					onTrashIconClick={() => handleDeleteDog(dog.id)}
					onHeartClick={() => handleIsFavorite(dog.id)}
					onEmptyHeartClick={() => handleIsFavorite(dog.id)}
				/>
			))}
			;
		</>
	);
};
