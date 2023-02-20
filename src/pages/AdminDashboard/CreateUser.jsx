import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Footer from '../../partials/Footer';
import CreateUserForm from '../../partials/Forms/AdminForms/CreateUserForm';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { loadStorage } from '../../utils/localStorage';

const CreateUser = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const currentUser = loadStorage('payment_user');
	
	useEffect(() => { 
		if (currentUser.role !== 'admin') {
           window.location.replace('/');
            return;
        }
	}, []);

    return (
        <div className="flex overflow-hidden">

			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

				{/*  Site header */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="height_handle">
					<main className='height_handle mt-7'>
						<div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

							<CreateUserForm title="Create User"/>
						</div>
					</main>
					<Footer />
				</div>

			</div>
		</div>
    );
};

export default CreateUser;