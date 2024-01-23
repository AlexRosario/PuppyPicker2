import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useDisplayDogs } from "./Providers/display";

export function App() {
	const { activeTab } = useDisplayDogs();

	return (
		<div className="App" style={{ backgroundColor: "skyblue" }}>
			<header>
				<h1>pup-e-picker (Functional)</h1>
			</header>

			<Section label={"Dogs: "}>
				{activeTab !== "create-dog-form" && <Dogs />}
				{activeTab === "create-dog-form" && <CreateDogForm />}
			</Section>
		</div>
	);
}
