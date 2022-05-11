# Movie Recommendation

Almost everyone today uses technology to stream movies and television shows. While figuring out what to stream next can be daunting, recommendations are often made based on a viewer’s history and preferences. This is done through machine learning and can be a fun and easy project for beginners to take on. New programmers can practice by coding in either Python or R languages and with data from the Movielens Dataset. Generated by more than 6,000 users, Movielens currently includes more than 1 million movie ratings of 3,900 films.

A recommendation system predicts the rating or the preference a user might give to an item. It is an algorithm that suggests relevant things to users. Thus, Recommender systems aim to present relevant items to users based on various factors. Recommender systems are widely used in products like in the case of Netflix, it recommends which movie to watch, in case of e-commerce, which product to buy, or in the case of kindle, which book to read, etc.

### Dataset: Movie Recommendations with Movielens Dataset
[https://grouplens.org/datasets/movielens/1m/](https://grouplens.org/datasets/movielens/1m/)

## Team: Big Oh
- Samarth Goudar (SJSU ID: 015212886)
- Unmesh Padhye (SJSU ID: 015928471)
- Koushik Pillalamarri (SJSU ID: 015017743)
- Krishna Gupta (SJSU ID: 015721199)

## Flask Backend APIs
| API  | Method | Req.Body                    | Description                                                                                                                                     | Output                                                                    |
|------|--------|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| /api | GET    | NA                          | Returns the response for status  of the backend server                                                                                          | 200 OK OR 500 INTERNAL SERVER ERROR                                       |
| /api | POST   | { movieName: 'Test Movie' } | Calls Recommendation system model for the  movie name received in request body and returns  an Array of Movie Object which contain all the data | {'status': 200, 'titles': movie_titles_json, 'poster': movie_poster_json} |

## Frontend Capture
![frontend_capture](https://user-images.githubusercontent.com/20245964/167751478-056964a3-3813-4b99-b6f7-ebf9eae962ee.jpeg)

## Progress Tracking
- [x] Literature Review and Studying datasets
- [x] Data Visualizations
- [x] Data Preprocessing
- [x] Content Based Filtering Algorithm Implementation
- [x] Collaborative Filtering System Algorithm Implementation
- [x] Flask Backend
- [x] Web App using React
