## Toddle Class

 **Virtual classroom that has two users:**

 - Teacher
 - Student

 **And has the following functionalities :**
 
 - Assignments are the work assigned to students by the teacher.
 - Assignment can only be created, updated and deleted by the teacher
 - The assignment consists of description, list of students, published at
   and a deadline date
 - Assignment published at is a date-time field at which the assignment
   needs to be published, if the assignment is scheduled for future then
   its status is SCHEDULED else ONGOING.
 - A student can add only one submission for an assignment.
 - A submission consists of a remark which will be a text field.
 - If a student has added any submission for an assignment, then the
   status of the assignment for that student gets updated to
   SUBMITTED

 ## API Contracts

 ---

 #### SERVER URL -> https://toddle-class.herokuapp.com

 ---

 GET /
 
 - opens the root route of the project

 #### URL params

 None

 #### Headers

 None

 #### Data params

 None

 #### Content

```
 {
   msg: "Welcome to toddle assignment mainframe api"
 }
```

---

### Auth Endpoints

- Authentication library - jwt
- password encryption library - bcrypt
- Role based auth used -> Route accessibility table
 ```
 teacher                |    student
 -----------------------|--------------------
 Add assignment         | Assignment feed
 Update assignment      | Submit assignment 
 Delete assignment      | Get Assignment details
 Assignment feed        | 
 Get Assignment details |
 ```

---

POST /api/auth/signup/
 
 - signs up the user into the system.
 - open route. can be accessed by anyone

 #### URL params
 
 None
 
 #### Headers
 
 None
 
 #### Data params
 
 ```
 {
   email: String,
   password: String,
   type: String // [student, teacher] No other value accepted
 }
```
 
 #### Content

 - Success Response
 ```
 {
   "status": 200,
    "data": {
        "id": String,
        "username": String,
        "type": String,
        "token": String
    }
 }
 ```

 ---

 POST /api/auth/login/
 
 - logs in the user
 - Open route. Can be accessed by anyone

 #### URL params
 
 None
 
 #### Headers
 
 None
 
 #### Data params
 
 ```
 {
    email: String,
    password: String
 }
 ```
 
 #### Content

 - Success Response

 ```
 {
    status: 200,
    data: {
              id: String,
              username: String,
              type: String,
              token: String
          }
 }
 ```

 ---

 ### Restricted API Endpoints

 POST /api/assignment/create/
 
 - Only Teacher cann add an assignment

 #### URL params
 
 None
 
 #### Headers
 
 `authorization: Bearer <token>`
 
 #### Data params
 
 ```
 {
    "s_ids: [String],
    "desc": String,
    "published_at": Date,
    "deadline": Date
 }
 ```
 
 #### Content

 - Successful Response

 ```
 {
    "status": 200,
    "data": {
        "s_ids": [String],
        "_id": String,
        "desc": STring,
        "published_at": Date,
        "deadline": Date,
        "t_id": Date
    }
}
 ```

 --- 

 PATCH /api/assignment/update/

 - Only teacher is allowed to make this request

 #### URL params
 
 - Assignment ID
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params

 ```
 {
    "s_ids": [String],
    "desc": String,
    "published_at": Date,
    "deadline": Date
 }
 ```
 
 #### Content
 
 ```
 {
    "status": 200,
    "data": {
        "s_ids": [String],
        "_id": String,
        "desc": String,
        "published_at": Date,
        "deadline": Date,
        "t_id": Date
    }
}
 ```
--- 

 DELETE  /api/assignment/delete/

 - Only Teacher is allowed to make this request

 #### URL params
 
 - Assignment ID
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 None
 
 #### Content

 ```
 {
    status: 200,
    data: "Delete Successful!"
 }
 ```
 --- 

 GET /api/user/fetch_all/

 - Both teacher and Student can make the request.
 - Hit by a student will return the submission made by the student.
 - Hit by the teacher will return all the assignments created by the teacher.
 - Has two fields namely **publish** and **status**.
 - Publish can be applied on both teacher and student.
 - While status can be applied only on the student.

 #### URL params
 
 None
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 ```
 {
    publish: "String", // [SCHEDULED, ONGOING]
    status: String, // [ALL, PENDING, OVERDUE, SUBMITTED]
 }
 ```
 
 #### Content

 - Success Response

 ```
 {
    status: 200,
    data: [
             {
                s_ids: [String], // Array of student ids that are assigned the assignment.
                t_id: String, // teacher id 
                _id: String,
                desc: String,
                published_at: Date,
                deadline: Date
             }
          ]
 }
 ``` 

 --- 
 
 POST /api/user/submit/

 - Can only be made by the Student
 - Will only be allowed to make a submission if that assignment has been assigned to the student.

 #### URL params
 
 None
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 ```
 {
    a_id: String,
    remark: String
 }
 ```
 
 #### Content



 --- 
 
 GET /api/user/fetch_assignment_details/

 - fdgfdg

 #### URL params
 
 None
 
 #### Headers

`authorization: Bearer <token>`
 
 #### Data params
 
 None
 
 #### Content

 --- 
 
