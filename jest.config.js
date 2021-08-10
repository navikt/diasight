module.exports = {
    projects: ["<rootDir>/apps/frontend", "<rootDir>/apps/api", "<rootDir>/apps/testdata"],
    transformIgnorePatterns: [
        "../../node_modules/(?!${nav-frontend-typografi})",
        "../../node_modules/(?!@navikt)",
    ],
};
