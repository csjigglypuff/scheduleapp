import React, { useState, useEffect } from 'react';

interface Group {
	id: number;
	name: string;
}

interface User {
	id: number;
	username: string;
}

const Sidebar: React.FC = () => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const response = await fetch('/api/group/getusers');
				const data = await response.json();
				setGroups(data);
			} catch (error) {
				setError('Failed to fetch groups');
			}
		};

		fetchGroups();
	}, []);

	const handleGroupSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const groupId = Number(e.target.value);
		const group = groups.find(g => g.id === groupId) || null;
		setSelectedGroup(group);
		setError('');
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleAddUser = async () => {
		if (!selectedGroup) {
			setError('Please select a group');
			return;
		}

		try {
			const response = await fetch(`/api/groups/${selectedGroup.id}/users`, {
				//making post request to api/groups and inserting ID of selected group, req body contains username
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username }),
			});

			if (response.ok) {
				setError('');
				setUsername('');
			} else {
				const data = await response.json();
				setError(data.error || 'Failed to add user');
			}
		} catch (error) {
			setError('Error occured while adding user');
		}
	};

	return (
		<div className="sidebar">
			<h2>Choose Group</h2>
			<select onChange={handleGroupSelect} value={selectedGroup?.id || ''}>
				<option value="" disabled>
					-- Select a group --
				</option>
				{groups.map(group => (
					<option key={group.id} value={group.id}>
						{group.name}
					</option>
				))}
			</select>
			{selectedGroup && (
				<div>
					<h3> Add User </h3>
					<input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
					<button onClick={handleAddUser}>Add</button>
				</div>
			)}
			{error && <p className="error">{error}</p>}
		</div>
	);
};

export default Sidebar;
