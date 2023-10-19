import React, { useState } from "react";
import ReactMarkDown from "react-markdown";
import firebase from "firebase/compat/app";
import { firestore } from "../firebase";
import { nanoid } from "nanoid";

const Create = () => {
	const [noteBody, setNoteBody] = useState("");
	const [noteTitle, setNoteTitle] = useState("");
	const notesRef = firestore.collection("notes");

	const handleSubmit = (e) => {
		e.preventDefault();
    if(!noteTitle && !noteBody) {
      alert('You cant save an empty note')
      return
    }
		notesRef.add({
			body: noteBody,
			title: noteTitle,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			id: nanoid(),
		});

		setNoteBody("");
		setNoteTitle("");
	};
	return (
		<div className="min-h-screen flex flex-col py-8 gap-4 w-full">
			<h2
				style={{
					background:
						"linear-gradient(20deg, rgba(79,70,229,1) 29%, rgba(191,70,229,1) 95%)",
					WebkitBackgroundClip: "text",
					color: "transparent",
				}}
				className="  text-3xl pointer-events-none font-semibold text-center "
			>
				Add your Note!
			</h2>
			<form
				onSubmit={handleSubmit}
				action=""
				className="flex flex-col flex-1 h-full gap-2"
			>
				<button className=" shadow-sm shadow-purple-900 hover:shadow-md transition-all hover:shadow-purple-900 w-fit block mx-auto bg-purple-950 py-2 px-4 rounded-lg text-gray-300 font-semibold">
					SAVE
				</button>

				<textarea
					onChange={(e) =>
						setNoteTitle(e.target.value)
					}
					value={noteTitle}
					placeholder="Title"
					className="flex-[0.15] max-h-9 px-4 py-1 bg-secondary outline-none text-gray-300 rounded-lg shadow-sm border border-[#2a2a2a] shadow-[#2a2a2a]"
				/>
				<textarea
					placeholder="Add Note Text (Markdown enabled)"
					onChange={(e) =>
						setNoteBody(e.target.value)
					}
					value={noteBody}
					className=" px-4 py-2 flex-1 bg-secondary outline-none text-gray-300 rounded-lg shadow-sm border border-[#2a2a2a] shadow-[#2a2a2a] "
				/>
			</form>
			<form action="" className="flex flex-col flex-[2] h-full">
				<h2
					style={{
						background:
							"linear-gradient(20deg, rgba(79,70,229,1) 29%, rgba(191,70,229,1) 95%)",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
					className="  text-3xl pointer-events-none font-semibold text-center "
				>
					Preview
				</h2>
				<div className=" px-4 py-2 flex-[1] bg-secondary outline-none text-gray-300 rounded-lg shadow-sm border border-[#2a2a2a] shadow-[#2a2a2a]  ">
					<ReactMarkDown>{noteBody.replace("\n", "\n\n")}</ReactMarkDown>
				</div>
			</form>
		</div>
	);
};

export default Create;
