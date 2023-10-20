import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import SelectedNote from "./pages/SelectedNote";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import firebase from "firebase/compat/app";
const App = () => {
	const [user] = useAuthState(auth);

	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return (
		<main className=" bg-primary min-h-screen font-Chivo relative">
			<div className=" container ">
				{!user ? (
					<div className=" w-full h-screen flex flex-row items-center justify-center">
						<button
							onClick={signInWithGoogle}
							className=" mt-8 text-white font-bold text-4xl mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a]"
						>
							Login
						</button>
					</div>
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create" element={<Create />} />
						<Route path="/notes/:id" element={<SelectedNote />} />
					</Routes>
				)}
			</div>
		</main>
	);
};

export default App;
