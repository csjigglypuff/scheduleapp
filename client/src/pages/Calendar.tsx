import React, { useState } from 'react';

const Calendar: React.FC = () => {
	const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const timeSlots = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

	// State to track selected time slots
	const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: string[] }>({});

	// Toggle selection of a time slot
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

	// Prepare data for POST request
	const handleSubmit = () => {
		const selectedData = Object.entries(selectedSlots).map(([day, times]) => ({
			day,
			times,
		}));
		console.log('Selected slots for submission:', selectedData);
		// You can then send this data using your preferred method (fetch, axios, etc.)
	};

	return (
		<div className="p-5">
			<div className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-4 shadow-lg">
				<div className="text-xl font-bold">Your Profile - GROUP SCHEDULES</div>
				<div>
					<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2">My Groups</button>
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
			<div className="flex border-2 gap-4">
				<div>
					<div className="border-2 grid grid-cols-7 gap-2">
						{daysOfWeek.map(day => (
							<div key={day} className="bg-gray-100 p-2 rounded-md shadow-sm">
								<div className="font-semibold text-center mb-2">{day}</div>
								{timeSlots.map(slot => (
									<div
										key={slot}
										className={`p-2 rounded-md mb-1 text-center cursor-pointer ${
											(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200' : 'bg-gray-200'
										}`}
										onClick={() => toggleSlot(day, slot)}
									>
										{slot}
									</div>
								))}
							</div>
						))}
					</div>

					<button className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700" onClick={handleSubmit}>
						Set schedule
					</button>
				</div>
				<div className="border-2 grid grid-cols-7 gap-2">
					{daysOfWeek.map(day => (
						<div key={day} className="bg-gray-100 p-2 rounded-md shadow-sm">
							<div className="font-semibold text-center mb-2">{day}</div>
							{timeSlots.map(slot => (
								<div
									key={slot}
									className={`p-2 rounded-md mb-1 text-center cursor-pointer ${
										(selectedSlots[day] || []).includes(slot) ? 'bg-blue-200' : 'bg-gray-200'
									}`}
									onClick={() => toggleSlot(day, slot)}
								>
									{slot}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Calendar;

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
