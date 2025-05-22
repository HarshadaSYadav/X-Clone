import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";

import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const { username } = useParams();

	const { follow, isPending } = useFollow();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const {
		data: user,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["userProfile"],
		queryFn: async () => {
			try {
				const res = await fetch(`https://x-clone-backend-tau.vercel.app/api/users/profile/${username}`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

	const isMyProfile = authUser._id === user?._id;
	const memberSinceDate = formatMemberSinceDate(user?.createdAt);
	const amIFollowing = authUser?.following.includes(user?._id);

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImg" && setCoverImg(reader.result);
				state === "profileImg" && setProfileImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		refetch();
	}, [username, refetch]);

	return (
		<div className="flex-[4_4_0] border-r border-gray-700 min-h-screen bg-black">
			{/* HEADER */}
			{(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
			{!isLoading && !isRefetching && !user && (
				<p className="text-center text-lg mt-4">User not found</p>
			)}
			{!isLoading && !isRefetching && user && (
				<>
					{/* Top Bar */}
					<div className="flex items-center px-6 py-3 border-b border-gray-800 bg-black sticky top-0 z-10">
						<Link to="/" className="mr-4">
							<FaArrowLeft className="w-5 h-5 text-white" />
						</Link>
						<div>
							<div className="font-bold text-xl">{user?.fullName}</div>
							<div className="text-xs text-gray-500">{user?.posts?.length || 0} posts</div>
						</div>
					</div>
					{/* Cover Image */}
					<div className="relative bg-gray-800">
						<img
							src={coverImg || user?.coverImg || "/cover.png"}
							className="h-56 w-full object-cover"
							alt="cover"
						/>
						{isMyProfile && (
							<div
								className="absolute top-3 right-3 rounded-full p-2 bg-gray-900 bg-opacity-80 cursor-pointer hover:bg-opacity-100 transition"
								onClick={() => coverImgRef.current.click()}
							>
								<MdEdit className="w-5 h-5 text-white" />
							</div>
						)}
						<input
							type="file"
							hidden
							accept="image/*"
							ref={coverImgRef}
							onChange={(e) => handleImgChange(e, "coverImg")}
						/>
						<input
							type="file"
							hidden
							accept="image/*"
							ref={profileImgRef}
							onChange={(e) => handleImgChange(e, "profileImg")}
						/>
						{/* Avatar */}
						<div className="absolute -bottom-16 left-8">
							<div className="relative group">
								<img
									src={profileImg || user?.profileImg || "/avatar-placeholder.png"}
									className="w-36 h-36 rounded-full border-4 border-black object-cover"
									alt="avatar"
								/>
								{isMyProfile && (
									<div
										className="absolute bottom-2 right-2 p-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition"
										onClick={() => profileImgRef.current.click()}
									>
										<MdEdit className="w-4 h-4 text-white" />
									</div>
								)}
							</div>
						</div>
					</div>
					{/* Profile Actions */}
					<div className="flex justify-end px-8 mt-6">
						{isMyProfile && <EditProfileModal authUser={authUser} />}
						{!isMyProfile && (
							<button
								className="btn btn-outline rounded-full btn-sm"
								onClick={() => follow(user?._id)}
							>
								{isPending && "Loading..."}
								{!isPending && amIFollowing && "Unfollow"}
								{!isPending && !amIFollowing && "Follow"}
							</button>
						)}
						{(coverImg || profileImg) && (
							<button
								className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
								onClick={async () => {
									await updateProfile({ coverImg, profileImg });
									setProfileImg(null);
									setCoverImg(null);
								}}
							>
								{isUpdatingProfile ? "Updating..." : "Update"}
							</button>
						)}
					</div>
					{/* Profile Info */}
					<div className="flex flex-col gap-2 mt-12 px-8">
						<div className="flex items-center gap-2">
							<span className="font-bold text-2xl">{user?.fullName}</span>
							{user?.isVerified && (
								<span className="ml-2 px-2 py-0.5 bg-black border border-sky-400 text-sky-400 rounded-full text-xs font-semibold flex items-center gap-1">
									<span className="material-icons text-base align-middle">verified</span>
									Get verified
								</span>
							)}
						</div>
						<span className="text-gray-500 text-base">@{user?.username}</span>
						{user?.bio && <span className="text-base my-1">{user?.bio}</span>}
						<div className="flex gap-4 flex-wrap items-center text-gray-400 text-sm mt-1">
							{user?.link && (
								<a
									href={user?.link}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-1 hover:underline"
								>
									<FaLink className="w-4 h-4" />
									{user?.link}
								</a>
							)}
							<div className="flex items-center gap-1">
								<IoCalendarOutline className="w-4 h-4" />
								<span>{memberSinceDate}</span>
							</div>
						</div>
						<div className="flex gap-4 mt-2 text-sm">
							<div className="flex gap-1 items-center">
								<span className="font-bold">{user?.following.length}</span>
								<span className="text-gray-400">Following</span>
							</div>
							<div className="flex gap-1 items-center">
								<span className="font-bold">{user?.followers.length}</span>
								<span className="text-gray-400">Followers</span>
							</div>
						</div>
					</div>
					{/* Tabs */}
					<div className="flex w-full border-b border-gray-700 mt-6 px-8">
						<div
							className={`flex justify-center flex-1 p-3 cursor-pointer font-semibold relative transition ${
								feedType === "posts"
									? "text-white"
									: "text-gray-400 hover:bg-[#16181c]"
							}`}
							onClick={() => setFeedType("posts")}
						>
							Posts
							{feedType === "posts" && (
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-sky-500"></div>
							)}
						</div>
						<div
							className={`flex justify-center flex-1 p-3 cursor-pointer font-semibold relative transition ${
								feedType === "likes"
									? "text-white"
									: "text-gray-400 hover:bg-[#16181c]"
							}`}
							onClick={() => setFeedType("likes")}
						>
							Likes
							{feedType === "likes" && (
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-sky-500"></div>
							)}
						</div>
					</div>
					{/* Feed */}
					<div className="px-0 md:px-8">
						<Posts feedType={feedType} username={username} userId={user?._id} />
					</div>
				</>
			)}
		</div>
	);
};

export default ProfilePage;
