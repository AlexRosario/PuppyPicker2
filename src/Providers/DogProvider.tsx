import {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type ActiveTab = "none" | "favorite" | "unfavorite" | "create-dog-form";

type TDogProvider = {
	activeTab: string;
	setActiveTab: (activeTab: ActiveTab) => void;
	allDogs: Dog[] | null;
	setAllDogs: (dogs: Dog[] | null) => void;
	favoriteDogs: Dog[] | undefined;
	unfavoriteDogs: Dog[] | undefined;
	dogsToDisplay: Dog[] | null | undefined;
	refetch: () => void;
};

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
	const [activeTab, setActiveTab] = useState<ActiveTab>("none");
	const [allDogs, setAllDogs] = useState<Dog[] | null>(null);
	const favoriteDogs = allDogs?.filter((dog) => dog.isFavorite);
	const unfavoriteDogs = allDogs?.filter((dog) => !dog.isFavorite);
	const dogsToDisplay =
		activeTab === "none"
			? allDogs
			: activeTab === "favorite"
			? favoriteDogs
			: unfavoriteDogs;

	const refetch = () => {
		Requests.getAllDogs()
			.then((data: Dog[]) => {
				setAllDogs(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		refetch();
	}, []);

	return (
		<DogContext.Provider
			value={{
				activeTab,
				setActiveTab,
				allDogs,
				setAllDogs,
				favoriteDogs,
				unfavoriteDogs,
				dogsToDisplay,
				refetch,
			}}>
			{children}
		</DogContext.Provider>
	);
};

export const useDisplayDogs = () => useContext(DogContext);
