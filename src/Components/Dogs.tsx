import { useDisplayDogs } from "../Providers/display";
import { DogCard } from "./DogCard";

type HandleFunctions = {
	handleDeleteDog: (dogId: number) => void;
	handleHeartClick: (dogId: number) => void;
};

export const Dogs = ({
	handleDeleteDog,
	handleHeartClick,
}: HandleFunctions) => {
	const { allDogs, activeTab } = useDisplayDogs();

	const favoriteDogs = allDogs?.filter((dog) => dog.isFavorite);
	const unfavoriteDogs = allDogs?.filter((dog) => !dog.isFavorite);

	const dogsToDisplay =
		activeTab === "none"
			? allDogs
			: activeTab === "favorite"
			? favoriteDogs
			: unfavoriteDogs;

	return (
		<>
			{dogsToDisplay?.map((dog) => (
				<DogCard
					dog={dog}
					key={dog.id}
					isLoading={false}
					onTrashIconClick={() => handleDeleteDog(dog.id)}
					onHeartClick={() => handleHeartClick(dog.id)}
					onEmptyHeartClick={() => handleHeartClick(dog.id)}
				/>
			))}
			;
		</>
	);
};
