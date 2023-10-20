import { useAuthState } from "react-firebase-hooks/auth";
import ReactMarkDown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const NotePreview = ({ body, title, createdAt, id, uid }) => {
	const [user] = useAuthState(auth);
	const date = createdAt?.toDate().toDateString();
	const navigate = useNavigate();
	return (
		<>
			{user.uid === uid && (
				<div
					onClick={() => navigate(`/notes/${id}`)}
					className=" cursor-pointer hover:scale-110 transition-all flex flex-col py-6 px-4 text-gray-300 rounded-lg h-96 bg-[rgb(113,63,251)] shadow-l shadow-secondary"
				>
					<h2 className=" text-center text-3xl font-semibold font-Outfit">
						{title}
					</h2>
					<ReactMarkDown className={"text-sm"}>
						{body.replace("\n", "\n\n").substring(0, 250)}
					</ReactMarkDown>
					<h4 className=" text-center mt-auto text-sm text-gray-400">
						{" "}
						{date}{" "}
					</h4>
				</div>
			)}
		</>
	);
};

export default NotePreview;
