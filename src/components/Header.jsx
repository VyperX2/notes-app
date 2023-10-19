const Header = () => {
	return (
		<header className="text-6xl font-semibold font-Outfit text-center py-4">
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
		</header>
	);
};

export default Header;
