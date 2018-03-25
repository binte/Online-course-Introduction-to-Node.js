::posts a post without comments
curl -H "Content-Type: application/json" -d "{\"user\": \"Manel\", \"title\":\"Testing\", \"content\":\"I am testing\"}" -iv -X POST "http://localhost:3000/posts"

::posts a post with one comment
curl -H "Content-Type: application/json" -d "{\"user\": \"Manecas\", \"title\":\"Manecas is testing\", \"content\":\"I, Manecas, am testing\", \"comments\":[{\"text\":\"escaxe\"}]}" -iv -X POST "http://localhost:3000/posts"

::posts a post with a comment that doesn't have the proper format : ERROR
curl -H "Content-Type: application/json" -d "{\"user\": \"Manel\", \"title\":\"Testing\", \"content\":\"I am testing\", \"comments\":[{\"texto\":\"escaxe\"}]}" -iv -X POST "http://localhost:3000/posts"

::gets posts data
curl -iv "http://localhost:3000/posts"

::gets post data with given ID
curl -iv "http://localhost:3000/posts?id=0"

::updates account data at a specified id
curl -H "Content-Type: application/json" -d "{\"title\": \"Still testing\"}" -iv -X PUT "http://localhost:3000/posts/1"

::deletes entry with a specified id
curl -iv -X DELETE "http://localhost:3000/posts/1"

::gets the comments for a specified post (with the given ID)
curl -iv "http://localhost:3000/posts/1/comments"

::posts comments to a post with a given ID
curl -H "Content-Type: application/json" -d "{\"text\" : \"new comment\"}" -iv -X POST "http://localhost:3000/posts/0/comments"

::updates a comment with a given ID within a post
curl -H "Content-Type: application/json" -d "{\"text\" : \"update the comment\"}" -iv -X PUT "http://localhost:3000/posts/0/comments/0"

::deletes a comment with a given ID within a post
curl -H "Content-Type: application/json" -iv -X DELETE "http://localhost:3000/posts/0/comments/0"