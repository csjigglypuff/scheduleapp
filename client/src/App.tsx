import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CreateGroup from './pages/CreateGroup';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CombinedSchedule from './pages/CombinedSchedule';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/calendar"
					element={
						<>
							<div className="flex">
								<Navbar />
								<Sidebar />
								<Calendar />
							</div>
						</>
					}
				/>
				<Route path="/creategroup" element={<CreateGroup />} />
				<Route path="/schedule/combined" element={<CombinedSchedule />} />
			</Routes>
		</Router>
	);
};

export default App;
