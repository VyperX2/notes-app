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
	const [isLoading, setIsLoading] = useState(true);
  

	useEffect(() => {
		if (notes) {
			setSelectedNote(notes.filter((note) => note.id === id));
			setIsLoading(false);
		}
	}, [id, notes]);

	return (
		<>
			{isLoading ? (
				<h2 className=" text-white text-6xl text-center flex items-center justify-center h-screen">
					Loading ...
				</h2>
			) : (
				<div className="w-full h-full text-gray-300 flex flex-col py-12">
					<h2 className="  text-4xl  text-center">{selectedNote[0].title}</h2>

					<ReactMarkDown className={''}>{selectedNote[0].body}</ReactMarkDown>
				</div>
			)}
		</>
	);
};

export default SelectedNote;
