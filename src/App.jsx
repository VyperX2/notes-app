import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import SelectedNote from "./pages/SelectedNote";
const App = () => {
	return (
		<main className=" bg-primary min-h-screen font-Chivo relative">
			<div className=" container ">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<Create />} />
					<Route path="/notes/:id" element={<SelectedNote />} />
				</Routes>
			</div>
		</main>
	);
};

export default App;
