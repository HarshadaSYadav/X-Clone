import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { IoSearch, IoNotifications, IoMail, IoPerson, IoEllipsisHorizontal } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { GiLightningHelix } from "react-icons/gi";
import { TbPremiumRights } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import XLogo from "../../assets/x-logo.png";

const sidebarLinks = [
	{ label: "Home", to: "/", icon: <MdHomeFilled className="w-7 h-7" /> },
	{ label: "Explore", to: "/explore", icon: <IoSearch className="w-7 h-7" /> },
	{ label: "Notifications", to: "/notifications", icon: <IoNotifications className="w-7 h-7" /> },
	{ label: "Messages", to: "/messages", icon: <IoMail className="w-7 h-7" /> },
	{ label: "Grok", to: "/grok", icon: <GiLightningHelix className="w-7 h-7" /> },
	{ label: "Communities", to: "/communities", icon: <FaUserGroup className="w-7 h-7" /> },
	{ label: "Premium", to: "/premium", icon: <TbPremiumRights className="w-7 h-7" /> },
	{ label: "Verified Orgs", to: "/verified-orgs", icon: <FaUserCheck className="w-7 h-7" /> },
	// Profile link will be handled separately for dynamic username
	{ label: "Profile", to: "/profile", icon: <IoPerson className="w-7 h-7" /> },
	{ label: "More", to: "/more", icon: <IoEllipsisHorizontal className="w-7 h-7" /> },
];

const Sidebar = () => {
	const queryClient = useQueryClient();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const location = useLocation();
	const navigate = useNavigate();
	const [showPostModal, setShowPostModal] = useState(false);

	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/auth/logout", { method: "POST" });
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			navigate("/login");
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});

	const handleNavClick = (to, label) => {
		if (label === "Profile" && authUser?.username) {
			navigate(`/profile/${authUser.username}`);
		} else {
			navigate(to);
		}
	};

	return (
		<div className="flex flex-col justify-between min-h-screen w-64 px-0 py-0 bg-black border-r border-gray-800">
			<div>
				{/* X Logo above Home label */}
				<Link to="/" className="flex items-center justify-center mt-6 mb-2">
					<img src={XLogo} alt="X Logo" className="w-12 h-12" />
				</Link>
				<nav className="flex flex-col gap-1">
					{sidebarLinks.map((link) => {
						const isActive =
							link.label === "Profile"
								? location.pathname.startsWith("/profile")
								: location.pathname === link.to;
						return (
							<button
								key={link.label}
								onClick={() => handleNavClick(link.to, link.label)}
								className={`flex items-center gap-4 py-3 px-7 rounded-full font-semibold transition text-lg w-full text-left ${
									isActive
										? "bg-white/10 text-white"
										: "hover:bg-white/10 text-white"
								} ${link.label === "Notifications" && isActive ? "bg-white/20" : ""}`}
								style={{
									outline: "none",
									border: "none",
									background: "none",
								}}
							>
								{link.icon}
								<span>{link.label}</span>
							</button>
						);
					})}
				</nav>
				<button
					className="w-11/12 mx-auto mt-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition block"
					onClick={() => setShowPostModal(true)}
				>
					Post
				</button>
				{showPostModal && (
					<CreatePostModal onClose={() => setShowPostModal(false)} />
					)}
			</div>
			{authUser && (
				<div className="flex items-center gap-3 mb-6 px-6 py-3 hover:bg-white/10 rounded-full cursor-pointer transition">
					<Link to={`/profile/${authUser.username}`} className="flex items-center gap-3 flex-1">
						<div className="avatar">
							<div className="w-10 h-10 rounded-full">
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="avatar" />
							</div>
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-base">{authUser.fullName}</span>
							<span className="text-xs text-gray-400">@{authUser.username}</span>
						</div>
					</Link>
					<BiLogOut
						className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
						onClick={logout}
						title="Logout"
					/>
				</div>
			)}
		</div>
	);
};

// Modal component for creating a post
function CreatePostModal({ onClose }) {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);
	const imgRef = useRef(null);
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const {
		mutate: createPost,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ text, img }) => {
			const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text, img }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: () => {
			setText("");
			setImg(null);
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			onClose();
		},
	});

	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setImg(reader.result);
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
			<div
				className="relative bg-black rounded-2xl shadow-2xl w-full max-w-xl mx-auto border border-gray-800"
				onClick={e => e.stopPropagation()}
			>
				{/* Close and Drafts */}
				<div className="flex justify-between items-center px-4 pt-4">
					<button onClick={onClose} className="text-white text-2xl rounded-full hover:bg-gray-800 p-1">
						<IoClose />
					</button>
					<span className="text-sky-400 font-semibold text-sm cursor-pointer">Drafts</span>
				</div>
				{/* Input */}
				<div className="px-6 pt-2 pb-4">
					<textarea
						className="w-full bg-transparent text-xl text-white placeholder-gray-400 resize-none border-none outline-none min-h-[80px]"
						placeholder="What's happening?"
						value={text}
						onChange={e => setText(e.target.value)}
						autoFocus
					/>
					<div className="text-sky-400 text-sm font-semibold mb-2 cursor-pointer">
						@Everyone can reply
					</div>
					{img && (
						<div className="relative w-60 mx-auto mb-2">
							<IoClose
								className="absolute top-1 right-1 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
								onClick={() => {
									setImg(null);
									imgRef.current.value = null;
								}}
							/>
							<img src={img} className="w-full h-40 object-contain rounded" alt="preview" />
						</div>
					)}
					<div className="flex items-center justify-between border-t border-gray-700 pt-3 mt-3">
						<div className="flex gap-3 items-center">
							<CiImageOn
								className="w-6 h-6 text-sky-400 cursor-pointer"
								onClick={() => imgRef.current.click()}
							/>
							<BsEmojiSmileFill className="w-5 h-5 text-sky-400 cursor-pointer" />
						</div>
						<input type="file" accept="image/*" hidden ref={imgRef} onChange={handleImgChange} />
						<button
							className="bg-gray-200 text-black font-bold rounded-full px-7 py-2 text-lg ml-2 disabled:opacity-60"
							disabled={(!text.trim() && !img) || isPending}
							onClick={() => createPost({ text, img })}
						>
							{isPending ? "Posting..." : "Post"}
						</button>
					</div>
					{isError && <div className="text-red-500 mt-2">{error.message}</div>}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
