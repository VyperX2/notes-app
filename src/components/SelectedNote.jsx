import {
	useCollection,
	useCollectionData,
} from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import ReactMarkDown from "react-markdown";

const SelectedNote = () => {
	const { id } = useParams();
	const notesRef = firestore.collection("notes");
	const query = notesRef.orderBy("createdAt");
	const [notes] = useCollectionData(query);

	return (
		<div className="w-full h-full text-gray-300 flex flex-col py-12">
			<h2 className="  text-4xl  text-center"> {notes && notes[0].title}</h2>
			<ReactMarkDown>
			  {notes && notes[0].body}
			</ReactMarkDown>
		</div>
	);
};

export default SelectedNote;
