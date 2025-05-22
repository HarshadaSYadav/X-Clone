import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdHomeFilled } from "react-icons/md";
import { IoSearch, IoNotifications, IoMail, IoPerson, IoEllipsisHorizontal } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { GiLightningHelix } from "react-icons/gi";
import { TbPremiumRights } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";
import XSvg from "../../components/svgs/X";

// Dummy conversations/messages
const conversations = [
	{
		id: 1,
		name: "Elon Musk",
		username: "elonmusk",
		avatar: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
		lastMessage: "Let's go to Mars 🚀",
		messages: [
			{ fromMe: false, text: "Let's go to Mars 🚀" },
			{ fromMe: true, text: "I'm ready!" },
		],
	},
	{
		id: 2,
		name: "Jane Doe",
		username: "janedoe",
		avatar: "/avatars/girl1.png",
		lastMessage: "See you at the event!",
		messages: [
			{ fromMe: false, text: "See you at the event!" },
			{ fromMe: true, text: "Sure, see you!" },
		],
	},
];

const navLinks = [
	
];

const MessagesPage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [selectedConv, setSelectedConv] = useState(null);
	const [search, setSearch] = useState("");
	const [newMsg, setNewMsg] = useState("");

	const filteredConvs = conversations.filter(
		(conv) =>
			conv.name.toLowerCase().includes(search.toLowerCase()) ||
			conv.username.toLowerCase().includes(search.toLowerCase())
	);

	const handleSend = () => {
		if (!newMsg.trim()) return;
		const idx = conversations.findIndex((c) => c.id === selectedConv.id);
		conversations[idx].messages.push({ fromMe: true, text: newMsg });
		setNewMsg("");
	};

	return (
		<div className="flex min-h-screen bg-black text-white">
			
				
				
			

			{/* Center: Inbox */}
			<main className="flex flex-col w-full max-w-xl border-x border-gray-800 min-h-screen mx-auto">
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
					<h2 className="text-xl font-bold">Messages</h2>
					<div className="flex items-center gap-4">
						<button className="text-2xl text-gray-400 hover:text-white">
							<span className="material-icons">settings</span>
						</button>
						<button className="text-2xl text-gray-400 hover:text-white">
							<span className="material-icons">edit_square</span>
						</button>
					</div>
				</div>
				{/* Search and Conversation List */}
				<div className="border-b border-gray-800 px-6 py-2">
					<input
						type="text"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search Direct Messages"
						className="w-full px-4 py-2 rounded-full bg-[#16181c] text-white border border-[#202327] focus:outline-none"
					/>
				</div>
				<div className="flex-1 overflow-y-auto">
					{filteredConvs.length === 0 && (
						<div className="flex flex-col items-center justify-center h-full py-10">
							<p className="text-gray-400">No conversations found.</p>
						</div>
					)}
					{filteredConvs.map((conv) => (
						<div
							key={conv.id}
							className={`flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-[#181818] transition ${
								selectedConv && selectedConv.id === conv.id ? "bg-[#181818]" : ""
							}`}
							onClick={() => setSelectedConv(conv)}
						>
							<img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
							<div className="flex-1">
								<div className="font-semibold">{conv.name}</div>
								<div className="text-xs text-gray-400 truncate">{conv.lastMessage}</div>
							</div>
						</div>
					))}
				</div>
				{/* Welcome message if no conversation selected */}
				{!selectedConv && (
					<div className="flex flex-col items-center justify-center flex-1 px-8 py-12">
						<h1 className="text-4xl font-extrabold mb-2 text-white">
							<span className="font-black">Welcome to your inbox!</span>
						</h1>
						<p className="text-gray-400 text-base mb-6 text-center">
							Drop a line, share posts and more with private conversations between you and others on X.
						</p>
						<button className="bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-8 py-3 text-lg">
							Write a message
						</button>
					</div>
				)}
			</main>

			{/* Right: Message Preview */}
			<aside className="hidden xl:flex flex-col flex-1 items-center justify-center min-h-screen border-r border-gray-800">
				{selectedConv ? (
					<div className="flex flex-col w-full h-full">
						{/* Header */}
						<div className="flex items-center gap-3 px-8 py-6 border-b border-gray-800">
							<img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full object-cover" />
							<div>
								<div className="font-bold">{selectedConv.name}</div>
								<div className="text-xs text-gray-400">@{selectedConv.username}</div>
							</div>
						</div>
						{/* Messages */}
						<div className="flex-1 flex flex-col gap-2 px-8 py-6 overflow-y-auto">
							{selectedConv.messages.map((msg, idx) => (
								<div
									key={idx}
									className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`px-4 py-2 rounded-2xl max-w-xs ${
											msg.fromMe
												? "bg-sky-500 text-white rounded-br-none"
												: "bg-[#181818] text-white rounded-bl-none"
										}`}
									>
										{msg.text}
									</div>
								</div>
							))}
						</div>
						{/* Input */}
						<div className="flex items-center gap-2 px-8 py-4 border-t border-gray-800">
							<input
								type="text"
								value={newMsg}
								onChange={e => setNewMsg(e.target.value)}
								placeholder="Start a new message"
								className="flex-1 px-4 py-2 rounded-full bg-[#16181c] text-white border border-[#202327] focus:outline-none"
								onKeyDown={e => {
									if (e.key === "Enter") handleSend();
								}}
							/>
							<button
								className="bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-6 py-2"
								onClick={handleSend}
							>
								Send
							</button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center w-full h-full">
						<h2 className="text-4xl font-extrabold mb-2 text-white">Select a message</h2>
						<p className="text-gray-400 text-base mb-6 text-center max-w-xs">
							Choose from your existing conversations, start a new one, or just keep swimming.
						</p>
						<button className="bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full px-8 py-3 text-lg">
							New message
						</button>
					</div>
				)}
			</aside>
		</div>
	);
};

export default MessagesPage;
