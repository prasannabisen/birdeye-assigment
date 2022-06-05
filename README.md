# BirdEye Assessment
Create an API to crawl reviews from website Tigerdirect. API should take any review page link
as input & give Json as output.

# Input
Any http://www.tigerdirect.com/ review page link. Eg :
https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3
839

# Installation

Use npm install to install package
```
npm install
```

# Usage
```
npm start
```

# Sample curl Request
```
curl --location --request GET 'localhost:3000/review' \
--header 'url: https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=1255116'
```