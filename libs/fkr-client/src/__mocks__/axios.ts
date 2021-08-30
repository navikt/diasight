export default {
    get: () => Promise.resolve({
        data: {
            entry: []
        }
    }),
    post: () => {
        return Promise.resolve({
            data: {
                access_token:"gf"
            }
        })
    },
};
