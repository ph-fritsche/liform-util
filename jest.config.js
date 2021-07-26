module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: [],
    snapshotSerializers: [
        'jest-snapshot-serializer-ansi',
    ],
    setupFilesAfterEnv: [
    ],
    testMatch: [
        '<rootDir>/test/**/*.{js,jsx,ts,tsx}',
    ],
    testPathIgnorePatterns: [
        '/_.*(?<!.test.js)$',
    ],
    transform: {
        '\\.([tj]sx?)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    verbose: true,
    testEnvironment: 'jsdom',
}
