import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import NotePreview from "./NotePreview";
import { firestore } from "../firebase";

const DisplayNotes = () => {
	const navigate = useNavigate();
	const notesRef = firestore.collection("notes");
	const query = notesRef.orderBy("createdAt");
	const [notes] = useCollectionData(query);

	return (
		<div className="flex flex-col mt-8 w-full items-center ">
			<form action="" className="flex w-[75%]">
				<input
					className=" flex-1 bg-[#1e1d1d] py-3 rounded-lg px-3 outline-none text-gray-300 "
					type="text"
					placeholder="Search for notes..."
				/>
			</form>
			<button
				className=" mt-8 text-white font-bold text-4xl mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a]"
				onClick={() => navigate("/create")}
			>
				Create Note
			</button>
			<div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8">
				{notes?.map((note) => (
					<NotePreview key={note.id} {...note} />
				))}
			</div>
		</div>
	);
};

export default DisplayNotes;
