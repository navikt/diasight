const { getJestProjects } = require("@nrwl/jest");

module.exports = {
    transformIgnorePatterns: [
        "../../node_modules/(?!${nav-frontend-typografi})",
        "../../node_modules/(?!@navikt)",
    ],
    projects: getJestProjects(),
};
