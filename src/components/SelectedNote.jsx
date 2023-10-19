import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { useEffect } from "react";
const SelectedNote = () => {
	const { id } = useParams();
	const notesRef = firestore.collection("notes");
	const query = notesRef.orderBy("createdAt");
	const [notes] = useCollectionData(query);
	let currentNote = null;

	useEffect(() => {
		currentNote = notes?.filter((note) => note.id === id);
	}, []);
	return (
		<div className="container">
			<h4 className=" text-white"></h4>
		</div>
	);
};

export default SelectedNote;
