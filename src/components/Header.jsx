import { auth } from "../firebase";

const Header = () => {

	return (
		<header className="text-6xl font-semibold font-Outfit text-center py-4 relative">
			<h1
				style={{
					background:
						"linear-gradient(20deg, rgba(63,94,251,1) 33%, rgba(252,70,107,1) 95%)",
					WebkitBackgroundClip: "text",
					color: "transparent",
				}}
			>
				Notes App
			</h1>
			<button onClick={() => auth.signOut()} className=" mt-8 text-2xl absolute -top-3 -right-96 text-white font-bold mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a]">
				Sign Out
			</button>
		</header>
	);
};

export default Header;
