import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import CardBalance from '../../partials/Cards/UserCard/CardBalance';
import MenuCard from '../../partials/Cards/UserCard/MenuCard';
import CardAbout from '../../partials/Cards/UserCard/CardAbout';
import Footer from '../../partials/Footer';

function Dashboard() {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Function to get the window width in pixels
	function getWindowWidth() {
		return window.innerWidth;
	}

	// Listen for changes to the window size
	window.addEventListener("resize", function () {
		// Set the window width to the state
		setWindowWidth(getWindowWidth());
	});

	return (
		<div className="flex overflow-hidden">

			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="height_handle main_bg">
					<main className='height_handle'>
						<div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

							<>
								<div className="relative">
									{/* Header */}
									<>
										<div className="relative mt-5">
											<div className={` items-center ${windowWidth < 550 ? "" : 'flex'}`}>
												<div className={` px-4 mx-auto md:px-10 ${(windowWidth < 1280 && windowWidth > 550) ? "w-1/2" : windowWidth < 550 ? "w-full" : 'w-1/2'}`}>
													<CardAbout />
												</div>

												<div className={` px-4 mx-auto md:px-10 ${(windowWidth < 1280 && windowWidth > 550) ? "w-1/2" : windowWidth < 550 ? "w-full" : 'w-1/2'}`}>
													<CardBalance />
												</div>
											</div>
											<div className={`px-4 md:px-10 mx-auto w-full `}>
												<div>
													{/* Card stats */}
													{
														windowWidth > 1222 ? (
															<>
																<div className=" flex justify-between">
																	<div className={`custom_width px-4`}>
																		<MenuCard
																			statSubtitle="Bank Transfer"
																			statUrl="/bank-transfer"
																			statIconName="fas fa-university"
																			statIconColor="bg-pink-500"
																		/>
																	</div>
																	<div className={`custom_width px-4`}>
																		<MenuCard
																			statSubtitle="Cash Out"
																			statUrl="/cashout"
																			statIconName="fas fa-hand-holding-usd"
																			statIconColor="bg-orange-500"
																		/>
																	</div>
																	<div className={`custom_width px-4`}>
																		<MenuCard
																			statSubtitle="Send Money"
																			statUrl="#"
																			statIconName="fas fa-share-square"
																			statIconColor="bg-red-500"
																		/>
																	</div>
																	<div className={`custom_width px-4`}>
																		<MenuCard
																			statSubtitle="Deposit"
																			statUrl="/deposit"
																			statIconName="fas fa-donate"
																			statIconColor="bg-blue-500"
																		/>
																	</div>
																	<div className={`custom_width px-4`}>
																		<MenuCard
																			statSubtitle="Payment"
																			statUrl="/payment"
																			statIconName="fas fa-money-check-alt"
																			statIconColor="bg-emerald-500"
																		/>
																	</div>
																</div>
															</>
														) : (
															<>
																<div className="flex flex-wrap">
																	<div className={` px-4 ${windowWidth < 573 ? "w-full" : "w-6/12"}`}>
																		<MenuCard
																			statSubtitle="Bank Transfer"
																			statUrl="/bank-transfer"
																			statIconName="fas fa-university"
																			statIconColor="bg-pink-500"
																		/>
																	</div>
																	<div className={` px-4 ${windowWidth < 573 ? "w-full" : "w-6/12"}`}>
																		<MenuCard
																			statSubtitle="Cash Out"
																			statUrl="/cashout"
																			statIconName="fas fa-hand-holding-usd"
																			statIconColor="bg-orange-500"
																		/>
																	</div>

																</div>

																<div className="flex flex-wrap">
																	<div className={` px-4 ${windowWidth < 573 ? "w-full" : "w-4/12"}`}>
																		<MenuCard
																			statSubtitle="Send Money"
																			statUrl="#"
																			statIconName="fas fa-share-square"
																			statIconColor="bg-red-500"
																		/>
																	</div>
																	<div className={` px-4 ${windowWidth < 573 ? "w-full" : "w-4/12"}`}>
																		<MenuCard
																			statSubtitle="Deposit"
																			statUrl="/deposit"
																			statIconName="fas fa-donate"
																			statIconColor="bg-blue-500"
																		/>
																	</div>
																	<div className={` px-4 ${windowWidth < 573 ? "w-full" : "w-4/12"}`}>
																		<MenuCard
																			statSubtitle="Payment"
																			statUrl="/payment"
																			statIconName="fas fa-money-check-alt"
																			statIconColor="bg-blue-500"
																		/>
																	</div>
																</div>
															</>
														)
													}

												</div>
											</div>
										</div>
									</>
									{/* <div className="px-4 md:px-10 mx-auto w-full">
									<div className="flex flex-wrap">
										<div className="w-full mb-12 xl:mb-0 px-4">
											<CardAbout />
										</div>
									</div>
								</div> */}
								</div>
							</>

						</div>
					</main>
					<Footer />
				</div>

			</div>
		</div>
	);
}

export default Dashboard;