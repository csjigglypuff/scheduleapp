module.exports = {
	roots: [
		'<rootDir>/client',
		'<rootDir>/tests/client',
		'<rootDir>/tests/server',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	projects: [
		{
			displayName: 'client',
			testEnvironment: 'jsdom',
			testMatch: ['<rootDir>/tests/client/**/*.[jt]s?(x)'],
			globals: {
				'ts-jest': {
					tsconfig: '<rootDir>/client/tsconfig.json',
				},
			},
			testPathIgnorePatterns: ['/node_modules/', '/client/setupTests.ts'],
		},
		{
			displayName: 'server',
			testMatch: [
				'<rootDir>/tests/server/**/*.[jt]s?(x)',
			],
			globals: {
				'ts-jest': {
					tsconfig: '<rootDir>/server/tsconfig.json',
				},
			},
		},
	],
};

  
  