import {
	useCollection,
	useCollectionData,
} from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import ReactMarkDown from "react-markdown";
import { useEffect, useState } from "react";

const SelectedNote = () => {
	const { id } = useParams();
	const notesRef = firestore.collection("notes");
	const query = notesRef.orderBy("createdAt");
	const [notes] = useCollectionData(query);
	const [selectedNote, setSelectedNote] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (notes) {
			setSelectedNote(notes.filter((note) => note.id === id));
			setIsLoading(false);
		}
	}, [id, notes]);

	const deleteNote = async () => {
		const noteToDeleteQuery = notesRef.where("id", "==", id);

		try {
			const snapShot = await noteToDeleteQuery.get();
			if (snapShot.size > 0) {
				const noteToDeleteId = snapShot.docs[0].id;
				notesRef.doc(noteToDeleteId).delete();
				navigate("/");
			} else {
				console.error("Not FOUND", error);
			}
		} catch {
			console.log("ERROR!");
		}
	};

	return (
		<>
			{isLoading ? (
				<h2 className=" text-white text-6xl text-center flex items-center justify-center h-screen">
					Loading ...
				</h2>
			) : (
				<div className="w-full h-full text-gray-300 flex flex-col py-12">
					<button
						onClick={deleteNote}
						className=" mt-8 text-white font-bold text-4xl mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a] block mx-auto  "
					>
						Delete
					</button>
					<h2 className=" font-bold  text-4xl  text-center">
						{selectedNote[0].title}
					</h2>
					<ReactMarkDown className={""}>{selectedNote[0].body}</ReactMarkDown>
				</div>
			)}
		</>
	);
};

export default SelectedNote;
