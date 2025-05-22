import { useState } from "react";

const orgs = [
	{
		name: "Coinbase",
		handle: "@coinbase",
		logo: "https://pbs.twimg.com/profile_images/1648754033305876480/4Qk2vCux_400x400.png",
		badge: "🟡",
	},
	{
		name: "Tesla",
		handle: "@Tesla",
		logo: "https://pbs.twimg.com/profile_images/1688578038978088960/0gk2dQ0A_400x400.jpg",
		badge: "🟡",
	},
	{
		name: "tobi lutke",
		handle: "@tobi",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		badge: "🟩",
		verified: true,
	},
];

const logos = [
	{
		src: "https://cdn.worldvectorlogo.com/logos/shopify-2.svg",
		alt: "Shopify",
		style: "h-8",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/SpaceX-Logo.svg",
		alt: "SpaceX",
		style: "h-6",
	},
	{
		src: "https://cryptologos.cc/logos/coinbase-coinbase-logo.svg?v=029",
		alt: "Coinbase",
		style: "h-8",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/SpaceX-Logo.svg",
		alt: "SpaceX",
		style: "h-6 rotate-180",
	},
];

const plans = [
	{
		key: "basic",
		name: "Basic",
		priceMonthly: 14000,
		priceYearly: 14000 * 12,
		features: [
			"Verified Gold badge",
			"$2,500 free ad credit",
			"Hiring",
			"Radar Basic",
			"Dedicated Support Service",
		],
	},
	{
		key: "full",
		name: "Full Access",
		priceMonthly: 69125,
		priceYearly: 69125 * 12,
		popular: true,
		features: [
			"Add affiliates to your page",
			"$12,000 free ad credit",
			"Radar Full Access",
			"Early access to Enterprise features",
		],
	},
];

const VerifiedOrgsPage = ({ onClose }) => {
	const [billing, setBilling] = useState("yearly");

	const handleClose = (e) => {
		e.stopPropagation();
		if (onClose) onClose();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
			onClick={handleClose}
		>
			<div
				className="relative w-full max-w-5xl mx-auto bg-black rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] border border-gray-800"
				onClick={e => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-gray-800 rounded-full p-2 transition"
					onClick={handleClose}
					aria-label="Close"
					type="button"
				>
					<span className="material-icons text-2xl">close</span>
				</button>

				{/* Hero Section (now first) */}
				<section className="w-full flex flex-col items-center justify-center py-14 bg-gradient-to-b from-[#181c20] to-black px-4">
					<div className="max-w-2xl mx-auto text-center mb-12">
						<div className="text-base font-semibold text-gray-400 mb-2">X Organizations</div>
						<h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
							Unlock growth on X with <br />
							<span className="text-gray-400">Verified Organizations</span>
						</h1>
						<p className="text-lg text-gray-300 mb-2">
							The most powerful tools to boost sales, hire the best people, and access exclusive market insights.
						</p>
					</div>
					{/* Animated org cards */}
					<div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
						<div className="bg-[#232428] rounded-xl px-6 py-4 flex items-center gap-3 shadow-lg min-w-[220px]">
							<img src={orgs[0].logo} alt={orgs[0].name} className="w-8 h-8 rounded" />
							<span className="font-semibold">{orgs[0].name}</span>
							<span className="text-yellow-400">{orgs[0].badge}</span>
							<span className="text-gray-400">{orgs[0].handle}</span>
						</div>
						<div className="bg-[#232428] rounded-xl px-6 py-4 flex items-center gap-3 shadow-lg relative -mt-8 md:-mt-0 md:-ml-8 md:z-10 min-w-[220px]">
							<img src={orgs[2].avatar} alt="tobi lutke" className="w-8 h-8 rounded-full" />
							<span className="font-semibold">tobi lutke</span>
							<span className="text-sky-400">✔️</span>
							<span className="text-green-400">{orgs[2].badge}</span>
							<span className="text-gray-400">{orgs[2].handle}</span>
						</div>
						<div className="bg-[#232428] rounded-xl px-6 py-4 flex items-center gap-3 shadow-lg min-w-[220px]">
							<img src={orgs[1].logo} alt={orgs[1].name} className="w-8 h-8 rounded" />
							<span className="font-semibold">{orgs[1].name}</span>
							<span className="text-yellow-400">{orgs[1].badge}</span>
							<span className="text-gray-400">{orgs[1].handle}</span>
						</div>
					</div>
				</section>

				{/* Pricing Section (now second) */}
				<section className="w-full flex flex-col items-center justify-center py-10 px-4">
					<div className="flex justify-center mb-8">
						<div className="flex items-center gap-4 text-lg font-semibold">
							<span
								className={`cursor-pointer ${billing === "monthly" ? "text-white" : "text-gray-400"}`}
								onClick={() => setBilling("monthly")}
							>
								Monthly
							</span>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={billing === "yearly"}
									onChange={() => setBilling(billing === "yearly" ? "monthly" : "yearly")}
								/>
								<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-sky-500 transition"></div>
								<span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-5"></span>
							</label>
							<span
								className={`cursor-pointer ${billing === "yearly" ? "text-white" : "text-gray-400"}`}
								onClick={() => setBilling("yearly")}
							>
								Yearly
							</span>
							{billing === "yearly" && (
								<span className="ml-2 px-2 py-0.5 bg-green-900 text-green-400 text-xs rounded font-semibold">
									SAVE 16%
								</span>
							)}
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-3xl">
						{plans.map((plan) => (
							<div
								key={plan.key}
								className={`flex-1 bg-[#181c20] rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#232428] ${
									plan.popular ? "relative" : ""
								}`}
							>
								{plan.popular && (
									<span className="absolute top-6 right-6 bg-green-700 text-xs px-3 py-1 rounded-full font-bold text-white">
										Popular
									</span>
								)}
								<div className="text-xl font-bold mb-2">{plan.name}</div>
								<div className="text-4xl font-extrabold mb-1">
									₹{(billing === "yearly"
										? plan.priceYearly / 12
										: plan.priceMonthly
									).toLocaleString()}
									<span className="text-lg font-medium text-gray-400"> / month</span>
								</div>
								<div className="text-gray-400 mb-4">
									₹{(billing === "yearly"
										? plan.priceYearly
										: plan.priceMonthly * 12
									).toLocaleString()} billed annually
								</div>
								<button className="w-full py-3 bg-white text-black rounded-full font-bold text-lg mb-6 hover:bg-gray-200 transition">
									{plan.key === "basic" ? "Get Basic" : "Get Full Access"}
								</button>
								<div className="text-left w-full">
									<div className="mb-2 font-semibold">
										{plan.key === "basic"
											? "Everything in Premium+ plus:"
											: "Everything in Basic plus:"}
									</div>
									<ul className="space-y-2 text-base">
										{plan.features.map((f, i) => (
											<li key={i} className="flex items-center gap-2">
												<span className="text-green-400">✓</span>
												{f}
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
					<div className="text-xs text-gray-400 mt-8 mb-2 text-center max-w-2xl">
						Each additional affiliated account is $600 per handle per year and ad credits are subject to limitations. <a href="#" className="underline">Learn more</a>
					</div>
					<div className="text-xs text-gray-400 mb-8 text-center max-w-2xl">
						All plans are subject to applicable taxes and fees. <a href="#" className="underline">Learn more</a>
					</div>
					<div className="flex justify-center items-center gap-12 mt-4 flex-wrap">
						{logos.map((logo, idx) => (
							<img
								key={idx}
								src={logo.src}
								alt={logo.alt}
								className={`opacity-80 grayscale hover:grayscale-0 transition ${logo.style}`}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default VerifiedOrgsPage;
