import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Update the code below to get and update data from the back-end server.
// Note that this is the front-end server, and you will have to configure
// the back-end server to allow cross-origin resource sharing.

function App() {
	const [students, setStudents] = useState([]);
	const formRef = useRef();

	useEffect(() => {
		// Get Students from the back-end server here
		axios
			.get("http://localhost:8080/api/v1/students")
			.then((res) => setStudents(res.data));
	}, []);

	const addStudent = (e) => {
		e.preventDefault();
		// Add students to the back-end server, and then update
		// the state with the response
		axios
			.post("http://localhost:8080/api/v1/students", {
				name: formRef.current.name.value,
				program: formRef.current.program.value,
				grade: formRef.current.grade.value,
			})
			.then((res) => {
				// Update State
				setStudents([...students, res.data]);
				// Delete
				// Delete an item from students
				// setStudents( [] )
			})
			.catch((err) => console.error(err));
	};

	const renderedStudents = students.map((student) => (
		<li key={student.id} className="list-group-item">
			{`${student.name}: ${student.program}, ${student.grade}`}
		</li>
	));

	return (
		<div className="container">
			<div className="row">
				<div className="col-4">
					<h2>Add Student</h2>
					<form onSubmit={addStudent} ref={formRef}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								placeholder="Enter Student Name"
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="program">Program</label>
							<input
								type="text"
								id="program"
								placeholder="Enter Program"
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="">Grade</label>
							<input
								type="text"
								id="grade"
								placeholder="Enter Grade"
								className="form-control"
							/>
						</div>
						<button className="btn btn-primary">Submit</button>
					</form>
				</div>
				<div className="col-8">
					<h2>Students</h2>
					<ul className="list-group">{renderedStudents}</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
