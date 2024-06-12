import React, { useState, useEffect } from 'react';

const CombinedSchedule: React.FC = () => {
	const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const timeSlots = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

	// State to store the overlapping schedule data
	const [overlappingSchedule, setOverlappingSchedule] = useState<{ [key: string]: string[] }>({});
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [users, setUsers] = useState<string[]>([]);

	// Fetch the overlapping schedule when a group is selected
	useEffect(() => {
		if (selectedGroup) {
			fetchOverlappingSchedule(selectedGroup);
		}
	}, [selectedGroup]);

	// Function to fetch overlapping schedule
	const fetchOverlappingSchedule = async (group: string) => {
		try {
			const response = await fetch('http://localhost:3000/schedule/combined', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ groupName: group }),
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.statusText}`);
			}

			const data = await response.json();
			setOverlappingSchedule(data.data); // Assuming the schedule data is in `data.data`
			setUsers(data.users); // Assuming user list is returned as `data.users`
		} catch (error) {
			console.error('Error fetching overlapping schedule:', error);
		}
	};

	// Function to handle group selection

	const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedGroup(e.target.value);
	};

	return (
		<div className="p-5 min-h-screen">
			<div className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-4 shadow-lg bg-opacity-80">
				<div className="text-xl font-bold">Group Schedules</div>
				<div className="flex items-center space-x-2">
					<select className="border border-gray-300 rounded-md p-2" onChange={handleGroupChange}>
						<option value="">- Choose Group -</option>
						{/* Add your group options here */}
						<option value="Cool Peoples">Cool Peoples</option>
						<option value="Other Group">Other Group</option>
					</select>
				</div>
			</div>

			<div className="mb-4">
				<div className="text-lg font-semibold">Users in Group:</div>
				<ul className="list-disc list-inside">
					{users.map((user, index) => (
						<li key={index}>{user}</li>
					))}
				</ul>
			</div>

			<div className="grid grid-cols-7 gap-6">
				{daysOfWeek.map(day => (
					<div key={day} className="bg-gray-100 p-4 rounded-md shadow-sm bg-opacity-60">
						<div className="font-semibold text-center mb-4">{day}</div>
						{timeSlots.map(slot => (
							<div
								key={slot}
								className={`p-4 rounded-md mb-2 text-center transition-colors duration-300 ${
									(overlappingSchedule[day] || []).includes(slot) ? 'bg-yellow-300' : 'bg-white bg-opacity-80 hover:bg-blue-100'
								}`}
							>
								{slot}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default CombinedSchedule;
