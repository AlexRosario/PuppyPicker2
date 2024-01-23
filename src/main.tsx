import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { DisplayProvider } from "./Providers/display";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Toaster />
		<DisplayProvider>
			<App />
		</DisplayProvider>
	</React.StrictMode>
);
