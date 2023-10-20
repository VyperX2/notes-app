import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import ReactMarkDown from "react-markdown";
import { useEffect, useState } from "react";

const SelectedNote = () => {
	const { id } = useParams();
	const notesRef = firestore.collection("notes");
	const query = notesRef.orderBy("createdAt");
	const [notes] = useCollectionData(query);
	const [selectedNote, setSelectedNote] = useState("");

	useEffect(() => {
		console.log(id);
		if (notes) {
			setSelectedNote(notes.filter((note) => note.id === id));
			console.log("THIS IS NOTE", selectedNote);
		}
	}, [id]);

	return (
		<>
			{selectedNote && (
				<div className="w-full h-full text-gray-300 flex flex-col py-12">
					<h2 className="  text-4xl  text-center">{selectedNote[0].title}</h2>
					<ReactMarkDown>{selectedNote[0].body}</ReactMarkDown>
				</div>
			)}
		</>
	);
};

export default SelectedNote;
