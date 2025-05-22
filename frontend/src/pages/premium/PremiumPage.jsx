import { useState } from "react";

const plans = [
	{
		key: "basic",
		name: "Basic",
		priceMonthly: 143,
		priceAnnually: 1716,
		save: 16,
		features: [
			"Small reply boost",
			"Encrypted direct messages",
			"Bookmark folders",
			"Highlights tab",
		],
		disabled: ["Edit post", "Longer posts"],
	},
	{
		key: "premium",
		name: "Premium",
		priceMonthly: 356,
		priceAnnually: 4272,
		save: 16,
		features: [
			"Everything in Basic, and",
			"Half Ads in For You and Following",
			"Larger reply boost",
			"Get paid to post",
		],
		disabled: ["Checkmark", "Edit post", "Longer posts"],
	},
	{
		key: "premiumPlus",
		name: "Premium+",
		priceMonthly: 2200,
		priceAnnually: 26400,
		save: 14,
		features: [
			"Everything in Premium, and",
			"Fully ad-free",
			"Largest reply boost",
			"Write Articles",
		],
		disabled: [],
	},
];

const PremiumPage = () => {
	const [billing, setBilling] = useState("annual");
	const [selected, setSelected] = useState("premium");

	const getPrice = (plan) =>
		billing === "annual"
			? `₹${plan.priceAnnually.toLocaleString()} / year`
			: `₹${plan.priceMonthly.toLocaleString()} / month`;

	const getMonthly = (plan) =>
		billing === "annual"
			? `₹${plan.priceAnnually / 12 | 0} / month`
			: `₹${plan.priceMonthly} / month`;

	const getSave = (plan) =>
		billing === "annual" && plan.save
			? <span className="ml-2 px-2 py-0.5 bg-green-900 text-green-400 text-xs rounded font-semibold">SAVE {plan.save}%</span>
			: billing === "annual" && plan.save === 0
			? null
			: null;

	const selectedPlan = plans.find((p) => p.key === selected);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
			<div className="relative w-full max-w-5xl mx-auto rounded-2xl bg-gradient-to-b from-[#181c20] to-black shadow-2xl p-0 overflow-hidden">
				{/* Close button */}
				<button
					className="absolute top-6 left-6 text-3xl text-gray-400 hover:text-white focus:outline-none"
					onClick={() => window.history.back()}
					aria-label="Close"
				>
					&times;
				</button>
				{/* Title and subtitle */}
				<div className="flex flex-col items-center pt-14 pb-8">
					<h1 className="text-5xl font-extrabold text-white mb-2">Upgrade to Premium</h1>
					<p className="text-lg text-gray-300 mb-2 text-center">
						Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.<br />
						<span className="text-gray-400 text-base">
							(For organizations, <a href="#" className="underline font-semibold">sign up here</a>)
						</span>
					</p>
					{/* Billing toggle */}
					<div className="flex items-center gap-2 mt-4">
						<button
							className={`px-4 py-1 rounded-full font-semibold text-sm transition ${
								billing === "annual"
									? "bg-sky-700 text-white"
									: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
							onClick={() => setBilling("annual")}
						>
							Annual
						</button>
						<span className="text-xs px-2 py-0.5 bg-green-900 text-green-400 rounded font-semibold">Best Value</span>
						<button
							className={`px-4 py-1 rounded-full font-semibold text-sm transition ${
								billing === "monthly"
									? "bg-sky-700 text-white"
									: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
							onClick={() => setBilling("monthly")}
						>
							Monthly
						</button>
					</div>
					<div className="text-xs text-gray-400 mt-2">Limited time offer</div>
				</div>
				{/* Plans */}
				<div className="flex flex-col md:flex-row justify-center gap-6 px-6 pb-8">
					{plans.map((plan) => (
						<div
							key={plan.key}
							className={`flex-1 min-w-[270px] max-w-xs bg-[#181c20] rounded-2xl border-2 transition-all duration-200
								${selected === plan.key ? "border-sky-500 shadow-lg" : "border-[#232428]"}
								flex flex-col relative`}
							onClick={() => setSelected(plan.key)}
							tabIndex={0}
							role="button"
							aria-pressed={selected === plan.key}
						>
							{/* Radio */}
							<div className="absolute top-6 right-6">
								<div
									className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
										selected === plan.key
											? "border-sky-500 bg-sky-500"
											: "border-gray-600 bg-black"
									}`}
								>
									{selected === plan.key && (
										<div className="w-3 h-3 rounded-full bg-white" />
									)}
								</div>
							</div>
							<div className="p-7 pb-4">
								<div className="text-lg font-bold mb-2">{plan.name}</div>
								<div className="flex items-end mb-1">
									<span className="text-3xl font-extrabold">
										{getMonthly(plan).split(" ")[0]}
									</span>
									<span className="ml-1 text-lg font-semibold text-gray-400">/ month</span>
								</div>
								<div className="text-gray-400 text-sm mb-2">
									{billing === "annual" && (
										<>
											₹{plan.priceAnnually.toLocaleString()} billed annually
											{getSave(plan)}
										</>
									)}
									{billing === "monthly" && (
										<>
											₹{plan.priceMonthly.toLocaleString()} billed monthly
										</>
									)}
								</div>
								<ul className="mb-2 mt-4">
									{plan.features.map((f, i) => (
										<li key={i} className="flex items-center gap-2 text-base text-white mb-1">
											<span className="text-green-400">✓</span>
											{f}
										</li>
									))}
									{plan.disabled.map((f, i) => (
										<li key={i} className="flex items-center gap-2 text-base text-gray-500 line-through mb-1">
											<span className="text-gray-500">✗</span>
											{f}
										</li>
									))}
								</ul>
								{billing === "annual" && (
									<div className="mt-2 text-base font-bold text-white">
										{plan.name === "Premium"
											? `Premium\n₹${plan.priceAnnually.toLocaleString()} / year`
											: ""}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
				{/* Subscribe Button */}
				<div className="flex flex-col items-center justify-center pb-8">
					<button
						className="w-full max-w-md py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full text-lg transition"
						onClick={() => alert(`Subscribed to ${selectedPlan.name} (${billing === "annual" ? "Annual" : "Monthly"})`)}
					>
						Subscribe & Pay
					</button>
					<div className="text-xs text-gray-400 mt-3 max-w-xl text-center">
						By subscribing, you agree to our <a href="#" className="underline">Purchaser Terms of Service</a>. Subscriptions auto-renew until canceled. <a href="#" className="underline">Cancel anytime</a>, at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through the platform you subscribed on.
					</div>
				</div>
			</div>
		</div>
	);
};

export default PremiumPage;
