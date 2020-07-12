class Student {

	constructor(name, dob ,matriculation)
		{
			this.name = name;
			this.dob = dob;
			this.matriculation = matriculation;
		}
}

class StudentsUI
	{
		addStudentToList(student)
			{
				const list = document.getElementById('student-list'); 
				const row = document.createElement('tr');

				row.innerHTML = ` 
									<td>${student.name}</td>
									<td>${student.dob}</td>
									<td>${student.matriculation}</td>
									<td><a href="#" class="delete">x</a></td>
								`;

				list.appendChild(row);
			}

			clearFields()
			{
				document.getElementById('name').value='';
				document.getElementById('dob').value='';
				document.getElementById('matriculation').value='';
			}

			showAlert(message, className)
				{
					const div = document.createElement('div');
					div.className = `alert ${className}`;
					div.appendChild(document.createTextNode(message)); // ??
					const container = document.querySelector('.container');
					const form = document.querySelector('#student-form');
					container.insertBefore(div , form); // here where message appear ? 


					setTimeout(function()
					{
						document.querySelector('.alert').remove();
					},3000);

				}

				deleteStudent(target)
				{
					if (target.className === 'delete') 
					{
						target.parentElement.parentElement.remove();
					}

				}

	}

class LocalStorage
{
	static getStudents() // why static ?
		 {
        let students;
        if (localStorage.getItem('students') === null) 
          {
            students = [];
          } 
          else 
          {
            students = JSON.parse(localStorage.getItem('students'));
          }

        return students;
      }
		      static displayStudents() 
      {
        const students = LocalStorage.getStudents();
        const studentsUI = new StudentsUI();
        students.forEach(function (student) 
          {
            studentsUI.addStudentToList(student);
          });
      }

		static addStudent(student)
		{
			const students = LocalStorage.getStudents();
			students.push(student); // How ?
			localStorage.setItem('students' , JSON.stringify(students));
		}

		static removeStudent(matriculation)
		{
			const students = LocalStorage.getStudents();
			students.forEach(function(student, index)
			{
				if (student.matriculation === matriculation) 
				{
					students.splice(index, 1);
				}
				localStorage.setItem('students' , JSON.stringify(students));
			});
		}
}
	// DOM load event
	document.addEventListener('DOMContentLoaded', LocalStorage.displayStudents());

	


	document.getElementById('student-form').addEventListener('submit' , function(e)
			{
				const name = document.getElementById('name').value;
					  dob = document.getElementById('dob').value;
					  matriculation = document.getElementById('matriculation').value;

					   // Instantiate student
					  const student = new Student(name , dob , matriculation); // ?
					   // Instantiate studentsUI
					  const studentsUI = new StudentsUI(); // Why?

					  if (name === '' || dob === '' || matriculation === '') 
					  {
					  	studentsUI.showAlert('Please fill in all fields','error');
					  }
					  else 
					  {

					  	studentsUI.addStudentToList(student);

					  	  // Add student to local storage
    					LocalStorage.addStudent(student);
					  	
					  	studentsUI.clearFields();
					  	studentsUI.showAlert('Student added!' ,'success');
					  }
					  e.preventDefault();
					});


			document.getElementById('student-list').addEventListener('click', function(e)
			{
				const studentsUI = new StudentsUI();

				studentsUI.deleteStudent(e.target);

				LocalStorage.removeStudent(e.target.parentElement.previousElementSibling.textContent); // ..?
				
				studentsUI.showAlert('Student removed!','success');

				e.preventDefault();// ?
			});

			