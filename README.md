# Assign Mentor Task
## About

This is a frontend for the Assign Mentor Task. Built using the JavaScript, React, Express.js, MongoDB, Node.js and Tailwind CSS.<br /><hr />
## Links
- Check out the live website [here](https://assign-mentor-selvan.netlify.app/student)!.
- To Check the Backend code of the Assign Mentor Task, please refer to this [link](https://github.com/Selvan-S/assign-mentor-backend).
## Run
Step 1: Clone or Fork the [`assign-mentor-backend`](https://github.com/Selvan-S/assign-mentor-backend) respository. Run the Backend, note the localhost.<br /><br/>
Step 2: Create a `.env.development.local` file in the root folder (Frontend) and give the Backend URL.
```
VITE_ASSIGN_MENTOR_BASE_API_URL=http://localhost:<Backend PORT>
VITE_MENTOR_BASE_URL=api/v1/mentor
VITE_STUDENT_BASE_URL=api/v1/student
```
Step 3: Add the `.env.development.local` in `.gitignore` file <br/> <br/>
Step 4: Install dependencies
```
npm install
```
Step 5: Run the application
```
npm run start
```
