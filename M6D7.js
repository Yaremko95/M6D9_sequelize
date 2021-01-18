/*
    MEDIUM PROJECT


    Your task is to build a proper backend . Backend needs to grant data persistance via PostgresSQL
    //BACKEND
    Create the the following tables:
        1.  article

                id
                headLine
                subHead
                content
                category
                cover
                createdAt
                updatedAt"

         2. author :

                id
                firstName
                lastName
                imgUrl
                createdAt
                updatedAt

          3. review:

                id
                text
                claps                     ?????
                createdAt
                updatedAt


    Implement relationships between tables. Add necessary columns to tables  and create foreign keys. Each review should reference author and product
    Insert some rows to users table using SQL Shell or PgAdmin

    Your backend should have the following routes included:
    GET /articles => returns the list of articles
    GET /articles/:id => returns a single article
    POST /articles => create a new article
    PUT /articles/:id => edit the article with the given id
    DELETE /articles/:id => delete the article with the given id

    [EXTRA]: Add the possibility to search by title or by content with the same text field

*/
