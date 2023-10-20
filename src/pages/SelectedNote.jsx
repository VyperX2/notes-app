import { useCollectionData } from "react-firebase-hooks/firestore";
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
	const [isEditing, setIsEditing] = useState(false);
	const [editedNote, setEditedNote] = useState(selectedNote[0]?.body);

	useEffect(() => {
		if (notes) {
			setSelectedNote(notes.filter((note) => note.id === id));
			setIsLoading(false);
		}
	}, [id, notes]);

	useEffect(() => {
		setEditedNote(selectedNote[0]?.body);
	}, [selectedNote]);

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

	const updateNote = async () => {
		const noteToUpdateQuery = notesRef.where("id", "==", id);

		try {
			const snapShot = await noteToUpdateQuery.get();
			if (snapShot.size > 0) {
				const noteToUpdateId = snapShot.docs[0].id;
				notesRef.doc(noteToUpdateId).update({
					body: editedNote,
				});
			}
		} catch {
			console.error("COULDNT UPDATE!");
		}
		setIsEditing((prev) => !prev);
	};

	return (
		<>
			{isLoading ? (
				<h2 className=" text-white text-6xl text-center flex items-center justify-center h-screen">
					Loading ...
				</h2>
			) : (
				<div className="w-full h-full text-gray-300 flex flex-col py-12">
					<div className=" flex items-center justify-center gap-20">
						<button
							onClick={deleteNote}
							className=" mt-8 text-white font-bold text-4xl mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a]   "
						>
							Delete
						</button>
						{isEditing ? (
							<button
								onClick={updateNote}
								className=" mt-8 text-white font-bold text-4xl mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a]   "
							>
								Save Changes
							</button>
						) : (
							<button
								onClick={() => setIsEditing((prev) => !prev)}
								className=" mt-8 text-white font-bold text-4xl mb-4 bg-purple-950 py-3 px-9 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#2a2a2a] hover:-translate-y-3  shadow-[#2a2a2a]   "
							>
								Edit
							</button>
						)}
					</div>
					{!isEditing ? (
						<div>
							<h2 className=" font-bold  text-4xl  text-center">
								{selectedNote[0].title}
							</h2>
							<ReactMarkDown className={""}>
								{selectedNote[0].body}
							</ReactMarkDown>
						</div>
					) : (
						<div className=" flex-1 flex w-full h-full">
							<textarea
								className="flex-1 min-h-[75vh]  px-4 py-2 bg-secondary outline-none text-gray-300 rounded-lg shadow-sm border border-[#2a2a2a] shadow-[#2a2a2a]"
								value={editedNote}
								onChange={(e) => {
									setEditedNote(selectedNote[0].body);
									setEditedNote(e.target.value);
								}}
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SelectedNote;
