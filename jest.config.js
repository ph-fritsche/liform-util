module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
    ],
    coveragePathIgnorePatterns: [],
    snapshotSerializers: [
        'jest-snapshot-serializer-ansi',
    ],
    setupFilesAfterEnv: [
    ],
    testMatch: [
        '<rootDir>/test/**/*.{js,jsx}',
    ],
    testPathIgnorePatterns: [
        '/_.*(?<!.test.js)$',
    ],
    transformIgnorePatterns: [
    ],
    verbose: true,
    testEnvironment: 'jsdom',
}
