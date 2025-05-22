import { useState } from "react";

const tabs = [
	{ label: "For You", value: "forYou" },
	{ label: "Trending", value: "trending" },
	{ label: "News", value: "news" },
	{ label: "Sports", value: "sports" },
	{ label: "Entertainment", value: "entertainment" },
];

const newsData = [
	{
		title: "NFL Owners to Decide Fate of Eagles' 'Tush Push' Play",
		time: "2 hours ago",
		category: "Sports",
		posts: "7.3K posts",
		tab: ["forYou", "trending", "sports"],
		avatar: "https://pbs.twimg.com/profile_images/1688578038978088960/0gk2dQ0A_400x400.jpg",
	},
	{
		title: "SGA's Foul Baiting Sparks Debate in NBA Conference Finals",
		time: "12 hours ago",
		category: "Sports",
		posts: "72K posts",
		tab: ["forYou", "trending", "sports"],
		avatar: "https://pbs.twimg.com/profile_images/1688578038978088960/0gk2dQ0A_400x400.jpg",
	},
	{
		title: "Rep. Gerry Connolly Dies at 75; Leaves Legacy of Service",
		time: "2 hours ago",
		category: "News",
		posts: "7.3K posts",
		tab: ["forYou", "trending", "news"],
		avatar: "https://pbs.twimg.com/profile_images/1688578038978088960/0gk2dQ0A_400x400.jpg",
	},
];

const trendingData = [
	{
		title: "#เฟิร์สข้าวตัง",
		desc: "Only on X · Trending",
		posts: "26.9K posts",
		tab: ["forYou", "trending"],
	},
	{
		title: "#PizzaDay",
		desc: "Trending in Business & finance",
		posts: "1,328 posts",
		tab: ["forYou", "trending"],
	},
	{
		title: "#AditiRaoHydari",
		desc: "Entertainment · Trending",
		posts: "",
		tab: ["forYou", "trending", "entertainment"],
	},
	{
		title: "#Kanimaa",
		desc: "Trending in India",
		posts: "",
		tab: ["forYou", "trending"],
	},
];

const ExplorePage = () => {
	const [feedType, setFeedType] = useState("forYou");
	const [search, setSearch] = useState("");

	const filteredNews = newsData.filter(
		(item) =>
			item.tab.includes(feedType) &&
			(item.title.toLowerCase().includes(search.toLowerCase()) ||
				item.category.toLowerCase().includes(search.toLowerCase()))
	);

	const filteredTrending = trendingData.filter(
		(item) =>
			item.tab.includes(feedType) &&
			(item.title.toLowerCase().includes(search.toLowerCase()) ||
				item.desc.toLowerCase().includes(search.toLowerCase()))
	);

	return (
		<div className="flex flex-col flex-[4_4_0] mx-auto border-x border-gray-700 min-h-screen max-w-2xl bg-black">
			{/* Search Bar */}
			<div className="sticky top-0 z-20 bg-black px-4 pt-4 pb-2">
				<input
					type="text"
					placeholder="Search"
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="w-full px-5 py-3 rounded-full bg-[#16181c] text-white border border-[#202327] focus:outline-none"
				/>
			</div>
			{/* Tabs */}
			<div className="flex w-full border-b border-gray-700 bg-black sticky top-[64px] z-10">
				{tabs.map((tab) => (
					<div
						key={tab.value}
						className={`flex justify-center flex-1 p-3 cursor-pointer font-medium relative transition ${
							feedType === tab.value
								? "text-white"
								: "text-gray-400 hover:bg-[#16181c]"
						}`}
						onClick={() => setFeedType(tab.value)}
					>
						{tab.label}
						{feedType === tab.value && (
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-sky-500"></div>
						)}
					</div>
				))}
			</div>
			{/* Main Content */}
			<div className="flex-1 bg-black">
				{/* Today's News */}
				<div className="bg-black px-6 py-4">
					<div className="text-xl font-bold mb-3">Today's News</div>
					{filteredNews.length === 0 && (
						<div className="text-gray-500 text-sm mb-4">No news found.</div>
					)}
					{filteredNews.map((item, idx) => (
						<div className="mb-4 flex items-start gap-3" key={idx}>
							<img src={item.avatar} alt="avatar" className="w-8 h-8 rounded-full mt-1" />
							<div>
								<div className="font-bold text-base leading-tight">{item.title}</div>
								<div className="flex items-center gap-2 text-xs text-gray-400">
									<span>{item.time}</span>
									<span>· {item.category}</span>
									<span>· {item.posts}</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* Trending */}
				<div className="bg-black px-6 pb-4">
					{filteredTrending.map((item, idx) => (
						<div className="mb-4" key={idx}>
							<div className="text-xs text-gray-400">{item.desc}</div>
							<div className="font-bold">{item.title}</div>
							{item.posts && <div className="text-xs text-gray-500">{item.posts}</div>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ExplorePage;
