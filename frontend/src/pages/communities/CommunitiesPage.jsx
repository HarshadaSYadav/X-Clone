import { useState } from "react";
import { FaArrowLeft, FaRegComment, FaRetweet, FaRegHeart, FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const categories = [
	"Sports",
	"Technology",
	"Art",
	"Entertainment",
	"Gaming",
	"Politics",
	"Science",
	"Music",
	"Business",
];

const dummyPosts = [
	{
		id: 1,
		user: {
			name: "Kyani Logghe",
			username: "TheKyaniL",
			avatar: "https://randomuser.me/api/portraits/men/32.jpg",
			badge: "",
		},
		community: "Build in Public",
		date: "May 20",
		content: "how do you handle the feeling that everything’s already been built?",
		comments: 33,
		retweets: 367,
		likes: "1.1M",
	},
	{
		id: 2,
		user: {
			name: "Knightly Legends",
			username: "KnightlyLegends",
			avatar: "https://randomuser.me/api/portraits/men/45.jpg",
			badge: "✔️",
		},
		community: "The Design Sphere",
		date: "May 20",
		content: "Do you like cats?",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		comments: 12,
		retweets: 44,
		likes: 201,
	},
];

const CommunitiesPage = () => {
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	return (
		<div className="flex flex-col flex-[4_4_0] border-r border-gray-700 min-h-screen bg-black max-w-2xl mx-auto">
			{/* Header */}
			<div className="sticky top-0 z-20 bg-black flex items-center px-4 py-3 border-b border-gray-700">
				<button className="mr-4 text-xl text-white hover:bg-gray-900 rounded-full p-2">
					<FaArrowLeft />
				</button>
				<h2 className="text-xl font-bold">Communities</h2>
			</div>
			{/* Tabs */}
			<div className="sticky top-[56px] z-10 bg-black border-b border-gray-700 overflow-x-auto">
				<div className="flex gap-2 px-4 py-2">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setSelectedCategory(cat)}
							className={`px-4 py-1 rounded-full font-semibold text-sm transition ${
								selectedCategory === cat
									? "bg-white text-black"
									: "bg-[#181c1f] text-white hover:bg-gray-800"
							}`}
						>
							{cat}
						</button>
					))}
				</div>
			</div>
			{/* Posts */}
			<div className="flex-1 flex flex-col">
				{dummyPosts.map((post) => (
					<div key={post.id} className="border-b border-gray-800 px-4 py-5 flex flex-col gap-2">
						<div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
							<span className="font-semibold text-white">{post.community}</span>
							<BsThreeDots className="ml-auto cursor-pointer" />
						</div>
						<div className="flex items-start gap-3">
							<img
								src={post.user.avatar}
								alt={post.user.name}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span className="font-bold text-white">{post.user.name}</span>
									{post.user.badge && (
										<span className="text-sky-400 text-xs">{post.user.badge}</span>
									)}
									<span className="text-gray-400 text-sm">@{post.user.username}</span>
									<span className="mx-1 text-gray-400">·</span>
									<span className="text-gray-400 text-sm">{post.date}</span>
								</div>
								<div className="text-white mb-2">{post.content}</div>
								{post.image && (
									<img
										src={post.image}
										alt="post"
										className="rounded-2xl border border-gray-800 max-w-full max-h-96 object-cover mb-2"
									/>
								)}
								<div className="flex gap-8 mt-2 text-gray-400 text-sm">
									<div className="flex items-center gap-1 cursor-pointer hover:text-sky-400 transition">
										<FaRegComment /> {post.comments}
									</div>
									<div className="flex items-center gap-1 cursor-pointer hover:text-green-500 transition">
										<FaRetweet /> {post.retweets}
									</div>
									<div className="flex items-center gap-1 cursor-pointer hover:text-pink-500 transition">
										<FaRegHeart /> {post.likes}
									</div>
									<div className="flex items-center gap-1 cursor-pointer hover:text-sky-400 transition">
										<FaShare />
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CommunitiesPage;
