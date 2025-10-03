export const TestData = {
    movies: {
        hotTubTimeMachine: 'Hot Tub Time Machine',
        theShawshankRedemption: 'The Shawshank Redemption'
    },
    
    urls: {
        top250: '/chart/top/',
        searchResults: '/find/',
        movieDetails: '/title/'
    },

    regexPatterns: {
        movieTitleLink: /^\d+\./,
        trimMovieNumber: /^\d+\.\s*/,
        year: /(19|20)\d{2}/,
        rating: /([1-9]\.\d+)/
    }
};