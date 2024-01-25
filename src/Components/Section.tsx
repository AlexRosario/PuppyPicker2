import { ReactNode } from "react";
import { useDisplayDogs } from "../Providers/DogProvider";

export const Section = ({
	label,
	children,
}: {
	// No more props than these two allowed
	label: string;
	children: ReactNode;
}) => {
	const { activeTab, setActiveTab, favoriteDogs, unfavoriteDogs } =
		useDisplayDogs();

	return (
		<section id="main-section">
			<div className="container-header">
				<div className="container-label">{label}</div>
				<div className="selectors">
					{/* This should display the favorited count */}
					<div
						className={`selector ${activeTab === "favorite" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("favorite");
						}}>
						favorited ( {favoriteDogs?.length ?? 0} )
					</div>

					{/* This should display the unfavorited count */}
					<div
						className={`selector ${activeTab === "unfavorite" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("unfavorite");
						}}>
						unfavorited ( {unfavoriteDogs?.length ?? 0} )
					</div>
					<div
						className={`selector ${
							activeTab === "create-dog-form" ? "active" : ""
						}`}
						onClick={() => {
							setActiveTab("create-dog-form");
						}}>
						create dog
					</div>
				</div>
			</div>
			<div className={`content-container`}>{children}</div>
		</section>
	);
};
