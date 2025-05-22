import { useState } from "react";
import { FiSend, FiSliders } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa";
import { PiLightningFill } from "react-icons/pi";
import { BsFillPenFill } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

const featureCards = [
	{
		label: "DeepSearch",
		icon: <FiSliders className="inline-block mr-1" />,
		desc: "Search deeply to deliver detailed, well-reasoned answers with Grok’s rapid, agentic search.",
	},
	{
		label: "Think",
		icon: <PiLightningFill className="inline-block mr-1" />,
		desc: "Solve the hardest problems in math, science, and coding with our reasoning model.",
	},
	{
		label: "Edit Image",
		icon: <BsFillPenFill className="inline-block mr-1" />,
		desc: "Transform your images with style transfers, edits, and more.",
	},
];

const GrokPage = () => {
	const [input, setInput] = useState("");
	const [history, setHistory] = useState([]);
	const [selectedFeature, setSelectedFeature] = useState("DeepSearch");
	const [showHistory, setShowHistory] = useState(false);

	const handleSend = () => {
		if (!input.trim()) return;
		const newEntry = {
			question: input,
			feature: selectedFeature,
			time: new Date().toLocaleTimeString(),
		};
		setHistory([newEntry, ...history]);
		setInput("");
	};

	const handleDrawMe = () => {
		setInput("Draw me a cat in cyberpunk style");
		setSelectedFeature("Edit Image");
	};

	return (
		<div className="flex flex-col flex-[4_4_0] min-h-screen bg-black text-white border-r border-gray-700">
			{/* Top Bar */}
			<div className="flex justify-between items-center px-8 pt-6 pb-2">
				<div className="font-bold text-lg select-none">
					Grok 3 <span className="ml-1">&#x25BC;</span>
				</div>
				<button
					className="flex items-center gap-1 font-semibold text-sm text-white/80 hover:text-white transition"
					onClick={() => setShowHistory((v) => !v)}
				>
					<BiHistory className="w-5 h-5" />
					History
				</button>
			</div>
			{/* Main Content */}
			<div className="flex flex-col items-center flex-1 w-full px-4">
				{/* Logo and Heading */}
				<div className="flex flex-col items-center mt-8 mb-6">
					{/* Grok Logo SVG */}
					<svg width="110" height="60" viewBox="0 0 110 60" fill="none" className="mb-2">
						<path d="M55 10 L65 30 L55 50 L45 30 Z" fill="#fff" opacity="0.1"/>
						<path d="M70 30 Q80 10 100 30 Q80 50 70 30 Z" fill="#fff" opacity="0.2"/>
						<path d="M40 30 Q30 10 10 30 Q30 50 40 30 Z" fill="#fff" opacity="0.2"/>
						<path d="M55 15 Q65 30 55 45 Q45 30 55 15 Z" fill="#fff"/>
					</svg>
					<div className="text-4xl font-bold">Grok</div>
				</div>
				{/* Search Box */}
				<div className="w-full max-w-2xl">
					<div className="rounded-2xl bg-[#18191b] border border-[#232428] flex flex-col gap-4 p-6 shadow-lg">
						<div className="flex items-center gap-2">
							<input
								type="text"
								placeholder="Ask anything"
								value={input}
								onChange={e => setInput(e.target.value)}
								onKeyDown={e => e.key === "Enter" && handleSend()}
								className="w-full bg-transparent text-white text-lg px-4 py-3 rounded-xl border border-[#232428] focus:outline-none"
							/>
							<button
								className="flex items-center justify-center w-10 h-10 rounded-full bg-[#232428] text-white border border-[#232428] hover:bg-[#232428]/80 transition"
								title="Settings"
							>
								<FiSliders />
							</button>
							<button
								className="flex items-center justify-center w-10 h-10 rounded-full bg-[#232428] text-white border border-[#232428] hover:bg-[#232428]/80 transition"
								title="Send"
								onClick={handleSend}
							>
								<FiSend />
							</button>
						</div>
						<div className="flex gap-2 mt-2">
							<button
								className={`flex items-center gap-1 px-4 py-2 rounded-full text-white text-sm font-semibold border border-[#232428] transition ${
									selectedFeature === "DeepSearch"
										? "bg-[#232428]"
										: "bg-transparent hover:bg-[#232428]/60"
								}`}
								onClick={() => setSelectedFeature("DeepSearch")}
							>
								<FiSliders /> DeepSearch
							</button>
							<button
								className={`flex items-center gap-1 px-4 py-2 rounded-full text-white text-sm font-semibold border border-[#232428] transition ${
									selectedFeature === "Think"
										? "bg-[#232428]"
										: "bg-transparent hover:bg-[#232428]/60"
								}`}
								onClick={() => setSelectedFeature("Think")}
							>
								<PiLightningFill /> Think
							</button>
							<button
								className={`flex items-center gap-1 px-4 py-2 rounded-full text-white text-sm font-semibold border border-[#232428] transition ${
									selectedFeature === "Edit Image"
										? "bg-[#232428]"
										: "bg-transparent hover:bg-[#232428]/60"
								}`}
								onClick={() => setSelectedFeature("Edit Image")}
							>
								<FaRegImage /> Edit Image
							</button>
						</div>
					</div>
					{/* Draw Me Card */}
					<div
						className="mt-4 rounded-2xl bg-[#18191b] border border-[#232428] flex items-center gap-4 p-4 shadow cursor-pointer hover:bg-[#232428]/60 transition"
						onClick={handleDrawMe}
					>
						<img src="https://abs.twimg.com/sticky/illustrations/grok-drawme-dark.png" alt="Draw Me" className="w-12 h-12 rounded-lg object-cover" />
						<div>
							<div className="font-semibold">Draw Me</div>
							<div className="text-gray-400 text-sm">Click here to try a random style!</div>
						</div>
					</div>
				</div>
				{/* Grok 3 is here */}
				<div className="w-full max-w-2xl mt-10">
					<div className="font-bold text-xl mb-1">Grok 3 is here.</div>
					<div className="text-gray-400 mb-4 text-sm">
						Try our new features: <span className="text-white">DeepSearch</span>, <span className="text-white">Think</span>, and <span className="text-white">Edit Image</span>
					</div>
					<div className="flex flex-col md:flex-row gap-4">
						{featureCards.map((card) => (
							<div key={card.label} className="flex-1 bg-[#18191b] border border-[#232428] rounded-2xl p-4">
								<div className="flex items-center gap-2 mb-2">
									<span className="bg-[#232428] px-2 py-1 rounded-full text-white text-xs">{card.icon}</span>
									<span className="font-semibold text-sm">{card.label}</span>
								</div>
								<div className="text-gray-300 text-sm">{card.desc}</div>
							</div>
						))}
					</div>
				</div>
				{/* History Modal */}
				{showHistory && (
					<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
						<div className="bg-[#18191b] border border-[#232428] rounded-2xl p-6 w-full max-w-md shadow-lg relative">
							<button
								className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl"
								onClick={() => setShowHistory(false)}
							>
								&times;
							</button>
							<div className="font-bold text-lg mb-4">History</div>
							{history.length === 0 ? (
								<div className="text-gray-400">No history yet.</div>
							) : (
								<ul className="space-y-3 max-h-72 overflow-y-auto">
									{history.map((item, idx) => (
										<li key={idx} className="border-b border-[#232428] pb-2">
											<div className="text-white font-semibold">{item.question}</div>
											<div className="text-xs text-gray-400">
												{item.feature} &middot; {item.time}
											</div>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GrokPage;
