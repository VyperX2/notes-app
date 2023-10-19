import DisplayNotes from "../components/DisplayNotes";
import Header from "../components/Header";

const Home = () => {

	return (
		<section className=" flex flex-col h-full w-full items-center ">
			<Header />
			<DisplayNotes />
		</section>
	);
};

export default Home;
