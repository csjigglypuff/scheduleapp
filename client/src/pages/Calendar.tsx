// import React, { useState } from 'react';
// const Calendar: React.FC = () => {
// 	const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// 	const timeSlots = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

// 	// State to track selected time slots
// 	const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: string[] }>({});

// 	// Toggle selection of a time slot
// 	const toggleSlot = (day: string, slot: string) => {
// 		setSelectedSlots(prev => {
// 			const selectedForDay = prev[day] || [];
// 			if (selectedForDay.includes(slot)) {
// 				// Remove slot
// 				return {
// 					...prev,
// 					[day]: selectedForDay.filter(time => time !== slot),
// 				};
// 			} else {
// 				// Add slot
// 				return {
// 					...prev,
// 					[day]: [...selectedForDay, slot],
// 				};
// 			}
// 		});
// 	};

// 	// Prepare data for POST request
// 	const handleSubmit = () => {
// 		const selectedData = Object.entries(selectedSlots).map(([day, times]) => ({
// 			day,
// 			times,
// 		}));
// 		console.log('Selected slots for submission:', selectedData);
// 		// You can then send this data using your preferred method (fetch, axios, etc.)
// 	};

// 	return (
// 		<div className="p-5">
// 			<div className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-4 shadow-lg">
// 				<div className="text-xl font-bold">Your Profile - GROUP SCHEDULES</div>
// 				<div>
// 					<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2">My Groups</button>
// 					<button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
// 				</div>
// 			</div>
// 			<div className="mb-4">
// 				<div className="text-lg font-semibold">YOUR PROFILE</div>
// 				<select className="mt-2 p-2 border border-gray-300 rounded-md w-full">
// 					<option>- choose group -</option>
// 					{/* Add group options here */}
// 				</select>
// 			</div>
// 			<div className="grid grid-cols-7 gap-4">
// 				{daysOfWeek.map(day => (
// 					<div key={day} className="bg-gray-100 p-2 rounded-md shadow-sm">
// 						<div className="font-semibold text-center mb-2">{day}</div>
// 						{timeSlots.map(slot => (
// 							<div
// 								key={slot}
// 								className={`p-2 rounded-md mb-1 text-center cursor-pointer ${
// 									(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200' : 'bg-gray-200'
// 								}`}
// 								onClick={() => toggleSlot(day, slot)}
// 							>
// 								{slot}
// 							</div>
// 						))}
// 					</div>
// 				))}
// 			</div>
// 			<button className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700" onClick={handleSubmit}>
// 				Set schedule
// 			</button>
// 		</div>
// 	);
// };

// 	return (
// 		<div className="p-5">
// 			<div className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-4 shadow-lg">
// 				<div className="text-xl font-bold">Your Profile - GROUP SCHEDULES</div>
// 				<div>
// 					<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2">My Groups</button>
// 					<button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
// 				</div>
// 			</div>
// 			<div className="mb-4">
// 				<div className="text-lg font-semibold">YOUR PROFILE</div>
// 				<select className="mt-2 p-2 border border-gray-300 rounded-md w-full">
// 					<option>- choose group -</option>
// 					{/* Add group options here */}
// 				</select>
// 			</div>
// 			<div className="flex border-2 gap-4">
// 				<div>
// 					<div className="border-2 grid grid-cols-7 gap-2">
// 						{daysOfWeek.map(day => (
// 							<div key={day} className="bg-gray-100 p-2 rounded-md shadow-sm">
// 								<div className="font-semibold text-center mb-2">{day}</div>
// 								{timeSlots.map(slot => (
// 									<div
// 										key={slot}
// 										className={`p-2 rounded-md mb-1 text-center cursor-pointer ${
// 											(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200' : 'bg-gray-200'
// 										}`}
// 										onClick={() => toggleSlot(day, slot)}
// 									>
// 										{slot}
// 									</div>
// 								))}
// 							</div>
// 						))}
// 					</div>

// 					<button className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700" onClick={handleSubmit}>
// 						Set schedule
// 					</button>
// 				</div>
// 				<div className="border-2 grid grid-cols-7 gap-2">
// 					{daysOfWeek.map(day => (
// 						<div key={day} className="bg-gray-100 p-2 rounded-md shadow-sm">
// 							<div className="font-semibold text-center mb-2">{day}</div>
// 							{timeSlots.map(slot => (
// 								<div
// 									key={slot}
// 									className={`p-2 rounded-md mb-1 text-center cursor-pointer ${
// 										(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200' : 'bg-gray-200'
// 									}`}
// 									onClick={() => toggleSlot(day, slot)}
// 								>
// 									{slot}
// 								</div>
// 							))}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Calendar;

// export default Calendar;

// import React, { useState } from 'react';

// const Calendar: React.FC = () => {
// 	const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// 	const timeSlots = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

// 	const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: string[] }>({});

// 	const toggleSlot = (day: string, slot: string) => {
// 		setSelectedSlots(prev => {
// 			const selectedForDay = prev[day] || [];
// 			const updatedSlots = selectedForDay.includes(slot) ? selectedForDay.filter(time => time !== slot) : [...selectedForDay, slot];

// 			const newState = {
// 				...prev,
// 				[day]: updatedSlots,
// 			};

// 			console.log('Updated selected slots:', newState);
// 			return newState;
// 		});
// 	};

// 	return (
// 		<div className="p-5">
// 			{/* Header and profile section */}
// 			{/* ... */}
// 			<div className="grid grid-cols-7 gap-4">
// 				{daysOfWeek.map(day => (
// 					<div key={day} className="bg-gray-100 p-2 rounded-md shadow-sm">
// 						<div className="font-semibold text-center mb-2">{day}</div>
// 						{timeSlots.map(slot => (
// 							<div
// 								key={slot}
// 								className={`p-2 rounded-md mb-1 text-center cursor-pointer ${
// 									(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200' : 'bg-gray-200'
// 								}`}
// 								onClick={() => toggleSlot(day, slot)}
// 							>
// 								{slot}
// 							</div>
// 						))}
// 					</div>
// 				))}
// 			</div>
// 			{/* Display the selected slots */}
// 			<div className="mt-4 p-2 bg-gray-50 rounded-md shadow">
// 				<h3 className="font-semibold">Selected Slots:</h3>
// 				<pre className="bg-gray-100 p-2 rounded-md">{JSON.stringify(selectedSlots, null, 2)}</pre>
// 			</div>
// 			<button className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700" onClick={() => console.log('Submitting:', selectedSlots)}>
// 				Set schedule
// 			</button>
// 		</div>
// 	);
// };

// export default Calendar;

import React, { useState, useEffect } from 'react';
import { jigglypuffhugsClockTower } from '../assets/jigglypuffhugsclocktower';

const Calendar: React.FC = () => {
	const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const timeSlots = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

	// State to track selected time slots
	const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: string[] }>({});
	// State to track dragging
	const [isDragging, setIsDragging] = useState(false);
	const [currentDay, setCurrentDay] = useState<string | null>(null);

	// Function to toggle selection of a time slot
	const toggleSlot = (day: string, slot: string) => {
		setSelectedSlots(prev => {
			const selectedForDay = prev[day] || [];
			if (selectedForDay.includes(slot)) {
				// Remove slot
				return {
					...prev,
					[day]: selectedForDay.filter(time => time !== slot),
				};
			} else {
				// Add slot
				return {
					...prev,
					[day]: [...selectedForDay, slot],
				};
			}
		});
	};

	// Function to handle the start of a drag
	const handleDragStart = (day: string, slot: string) => {
		setIsDragging(true);
		setCurrentDay(day);
		toggleSlot(day, slot);
	};

	// Function to handle dragging over slots
	const handleDragOver = (day: string, slot: string) => {
		if (isDragging && currentDay === day) {
			toggleSlot(day, slot);
		}
	};

	// Function to handle the end of a drag
	const handleDragEnd = () => {
		setIsDragging(false);
		setCurrentDay(null);
	};

	// Attach and remove event listeners for mouse and touch events
	useEffect(() => {
		const handleMouseUp = () => handleDragEnd();
		const handleTouchEnd = () => handleDragEnd();

		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('touchend', handleTouchEnd);

		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, []);

	// Function to handle submission of selected slots
	const handleSubmit = async () => {
		const selectedData = Object.entries(selectedSlots).map(([day, times]) => ({
			day,
			times,
		}));
		console.log('Selected slots for submission:', selectedData);

		// Define your API endpoint
		const apiEndpoint = 'http://localhost:3000/schedule'; // Ensure this matches your backend route

		try {
			// Make a POST request to the API endpoint
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ schedule: selectedData }), // Send the selected slots as a JSON payload
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.statusText}`);
			}

			const data = await response.json();
			console.log('Schedule successfully submitted:', data);
			// You can handle successful submission here, such as showing a notification to the user
		} catch (error) {
			console.error('Error submitting schedule:', error);
			// Handle error (e.g., show a notification to the user)
		}
	};

	return (
		<div className="relative min-h-screen">
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `url(${jigglypuffhugsClockTower})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					zIndex: -1,
				}}
			></div>
			<div className="p-5">
				<div className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-4 shadow-lg bg-opacity-80">
					<div className="text-xl font-bold">Your Profile - Your Schedule</div>
					<div className="flex items-center space-x-2">
						<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">My Groups</button>
						<button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700" onClick={handleSubmit}>
							Set schedule
						</button>
						<button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
					</div>
				</div>
				<div className="mb-4">
					<div className="text-lg font-semibold">YOUR PROFILE</div>
					<select className="mt-2 p-2 border border-gray-300 rounded-md w-full">
						<option>- choose group -</option>
						{/* Add group options here */}
					</select>
				</div>

				<div className="grid grid-cols-7 gap-6">
					{daysOfWeek.map(day => (
						<div key={day} className="bg-gray-100 p-4 rounded-md shadow-sm bg-opacity-60">
							<div className="font-semibold text-center mb-4">{day}</div>
							{timeSlots.map(slot => (
								<div
									key={slot}
									className={`p-4 rounded-md mb-2 text-center cursor-pointer transition-colors duration-300 ${
										(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200 hover:bg-blue-300' : 'bg-white bg-opacity-80 hover:bg-blue-100'
									}`}
									onMouseDown={() => handleDragStart(day, slot)}
									onMouseEnter={() => handleDragOver(day, slot)}
									onTouchStart={() => handleDragStart(day, slot)}
									onTouchMove={() => handleDragOver(day, slot)}
								>
									{slot}
								</div>
							))}
						</div>
					))}
				</div>
				<div className="mt-4 p-2 bg-gray-50 rounded-md shadow">
					<h3 className="font-semibold">Selected Slots:</h3>
					<pre className="bg-gray-100 p-2 rounded-md">{JSON.stringify(selectedSlots, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}; //adding this line to remove later, just so i can commit and push the latest  dev being merged into my branch

export default Calendar;
