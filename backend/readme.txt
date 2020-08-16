Methods for Authentication:-
1)POST http://localhost:3000/users/login => log in user 

include the default username and password if necessary

username:Jake
password:Cro7


2)GET http://localhost:3000/users/logout  => log out 


Methods after authentication:-

1) GET http://localhost:3000/students  => retrieves all the records both admin and student type


2) GET http://localhost:3000/students/'id'  => retrieves the record with the id

e.g GET http://localhost:3000/students/5f2c24f3cc78a5295035e369  => retrieves the record with the id 5f2c24f3cc78a5295035e369

3) POST http://localhost:3000/students => creates a new record have to include the data in the body of this request

4) PUT http://localhost:3000/students/id => updates the record with the id. Have to include the data for update in the body of the API request. (Json format)

e.g. PUT http://localhost:3000/students/5f2c24f3cc78a5295035e369  => updates the record with the id 5f2c24f3cc78a5295035e369. 

5) DELETE http://localhost:3000/students/'id'  => Delete the record with the id

e.g DELETE http://localhost:3000/students/5f2c24f3cc78a5295035e369  => Delete the record with the id 5f2c24f3cc78a5295035e369


A special request to get the account details by sending the username:-

GET http://localhost:3000/users/check/username

e.g. http://localhost:3000/users/check/BRent657