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

type TDisplayProvider = {
	activeTab: string;
	setActiveTab: (activeTab: ActiveTab) => void;
	allDogs: Dog[] | null;
	setAllDogs: (dogs: Dog[] | null) => void;
};

const DisplayContext = createContext<TDisplayProvider>({} as TDisplayProvider);

export const DisplayProvider = ({ children }: { children: ReactNode }) => {
	const [activeTab, setActiveTab] = useState<ActiveTab>("none");
	const [allDogs, setAllDogs] = useState<Dog[] | null>(null);

	useEffect(() => {
		Requests.getAllDogs()
			.then((data: Dog[]) => {
				setAllDogs(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<DisplayContext.Provider
			value={{
				activeTab,
				setActiveTab,
				allDogs,
				setAllDogs,
			}}>
			{children}
		</DisplayContext.Provider>
	);
};

export const useDisplayDogs = () => useContext(DisplayContext);
