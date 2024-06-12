import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
	id: number;
	username: string;
}

const CreateGroup: React.FC = () => {
	const [groupName, setGroupName] = useState('');
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [newUser, setNewUser] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [error, setError] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('api/group/getusers');
				const data = await response.json();
				setAllUsers(data);
			} catch (error) {
				setError('Failed to fetch users');
			}
		};

		fetchUsers();
	}, []);

	const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGroupName(e.target.value);
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUser(e.target.value);
	};

	// const handleAddUser = () => {
	// 	const user = allUsers.find(u => u.username === newUser);
	// 	if (user && !selectedUsers.some(u => u.id === user.id)) {
	// 		setSelectedUsers([...selectedUsers, user]);
	// 		setNewUser('');
	// 	} else {
	// 		setError('User not found or already added');
	// 	}
	// };

	const handleAddUser = async (e: any) => {
		e.preventDefault();

		if (!groupName) {
			setError('Group name is required');
			return;
		}

		try {
			const response = await fetch('api/group/adduserstogroup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ groupName, username: newUser }),
			});

			if (response.ok) {
				navigate('/calendar');
			} else {
				setError('Failed to create group');
			}
		} catch (error) {
			setError('An error occured during group creation');
		}
	};

	const handleRemoveUser = (userId: number) => {
		setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
	};

	const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!groupName) {
			setError('Group name is required');
			return;
		}

		// for add Group will we need to add User at the same time?
		// if (selectedUsers.length === 0) {
		// 	setError('Please select at least one user');
		// 	return;
		// }

		try {
			const response = await fetch('api/group/addgroup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ groupName, users: selectedUsers }),
			});

			if (response.ok) {
				navigate('/calendar');
			} else {
				setError('Failed to create group');
			}
		} catch (error) {
			setError('An error occured during group creation');
		}
	};

	return (
		<div className="creategroupcontainer">
			<h1>Create Group</h1>
			{error && <p className="error">{error}</p>}
			<form onSubmit={handleCreateGroup} className="creategroupform">
				<input type="text" value={groupName} onChange={handleGroupNameChange} placeholder="Group Name" className="input" />
				<input type="text" value={newUser} onChange={handleUserChange} placeholder="Add User" className="input" />
				{/* <button type="button" onClick={handleAddUser} className="adduserbutton">
					Add User
				</button> */}
				<div className="selectedusers">
					{selectedUsers.map(user => (
						<div key={user.id} className="selecteduser">
							{user.username}
							<button type="button" onClick={() => handleRemoveUser(user.id)}>
								Remove
							</button>
						</div>
					))}
				</div>
				<button type="submit" className="creategroupbutton">
					Create Group
				</button>
			</form>
			<button type="button" onClick={handleAddUser} className="adduserbutton">
				Add User
			</button>
		</div>
	);
};

export default CreateGroup;
