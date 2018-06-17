curl -H "Content-Type: application/json" -X POST -d "{\"balance\": \"1000\", \"name\": \"savings\"}" "http://localhost:3000/accounts"

curl -H "Content-Type: application/json" -X POST -d "{\"name\": \"new savings\"}" "http://localhost:3000/accounts"

curl -iv "http://localhost:3000/accounts"

curl -iv "http://localhost:3000/accounts?id=5b262a1f71fec397ec348f7f"

curl -H "Content-Type: application/json" -d "{\"name\": \"savings updated\"}" -iv -X PUT "http://localhost:3000/accounts/5b262a1f71fec397ec348f7f"

curl -iv -X DELETE "http://localhost:3000/accounts/5b262a1f71fec397ec348f7f"
