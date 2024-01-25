import { useDisplayDogs } from "../Providers/DogProvider";
import { DogCard } from "./DogCard";

type HandleFunctions = {
	handleDeleteDog: (dogId: number) => void;
	handleHeartClick: (dogId: number) => void;
};

export const Dogs = ({
	handleDeleteDog,
	handleHeartClick,
}: HandleFunctions) => {
	const { dogsToDisplay } = useDisplayDogs();

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
