import ReactMarkDown from "react-markdown";
import { useNavigate } from "react-router-dom";

const NotePreview = ({ body, title, createdAt, id }) => {
	const date = createdAt.toDate().toDateString();
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/notes/${id}`)}
			className="flex flex-col py-6 px-4 text-gray-300 items-center rounded-lg h-96 bg-[rgb(113,63,251)] shadow-l shadow-secondary"
		>
			<h2 className=" text-3xl font-semibold font-Outfit">{title}</h2>
			<ReactMarkDown>{body.replace("\n", "\n\n")}</ReactMarkDown>
			<h4 className=" mt-auto text-sm text-gray-400"> {date} </h4>
		</div>
	);
};

export default NotePreview;
