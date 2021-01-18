/*
    MEDIUM PROJECT
    Today you continue building Medium API.
    Backend needs to grant data persistance via PostgreSQ:
    //BACKEND
    Your backend should now have the possibility to add a review to an
    article.
    Each review should have a reference to an authors and articles table.
    GET /articles/:id/reviews => returns all the reviews for the specified article
    GET /articles/:id/reviews/:reviewId => returns a single review for the specified article
    POST /articles/:id => adds a new review for the specified article
    PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article
    DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article

    Improve GET /articles endpoint ->  returns a list of articles in which also the info from the reviews appears (use JOIN to retrieve those info)

    [EXTRA]
    Sort articles by number of reviews. Let's say, an article with the greatest number of reviews is the most popular (use JOIN, COUNT, GROUP BY to write a query )
*/
