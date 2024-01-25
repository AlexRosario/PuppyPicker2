import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useDisplayDogs } from "./Providers/DogProvider";
import { Requests } from "./api";

export function App() {
	const { activeTab, allDogs, setAllDogs } = useDisplayDogs();

	const handleDeleteDog = (dogId: number) => {
		setAllDogs(allDogs!.filter((dog) => dog.id !== dogId));
		Requests.deleteDog(dogId) //force break
			.catch((error) => {
				console.error("Error deleting dog:", error);
				setAllDogs(allDogs);
			});
	};

	const handleHeartClick = (dogId: number) => {
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
		<div className="App" style={{ backgroundColor: "skyblue" }}>
			<header>
				<h1>pup-e-picker (Functional)</h1>
			</header>

			<Section label={"Dogs: "}>
				{activeTab !== "create-dog-form" && (
					<Dogs
						handleDeleteDog={handleDeleteDog}
						handleHeartClick={handleHeartClick}
					/>
				)}
				{activeTab === "create-dog-form" && <CreateDogForm />}
			</Section>
		</div>
	);
}
