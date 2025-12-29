function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    listCourses() {
      return this.courses;
    },
    addCourse(course) {
      this.courses.push(course);
    },
    addGrade(courseCode, grade) {
      const course = this.courses.find(course => course.code === Number(courseCode));
      if (course) {
        course.grade = grade;
      }
    },
    addNote(courseCode, note) {
      const course = this.courses.find(course => course.code === Number(courseCode));
      if (course) {
        if (course.notes) {
          course.notes.push(note);
        } else {
          course.notes = [note];
        }
      }
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.notes) {
          console.log(`${course.name}: ${course.notes.join('; ')}`);
        }
      })
    },
    updateNote(courseCode, note) {
      const course = this.courses.find(course => course.code === Number(courseCode));
      if (course) {
        course.notes = [note];
      }
    },
  }
}

let school = {
  students: [],
  courses: [],
  addStudent(name, year) {
    if (this.isValidYear(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      return `Invalid year.`;
    }
  },
  isValidYear(year) {
    return ['1st', '2nd', '3rd', '4th', '5th'].includes(year)
  },
  enrollStudent(student, course) {
    student.addCourse({...course});
    if (!this.courseExists(course)) {
      this.courses.push({...course});
    }
  },
  courseExists(course) {
    for (const c of this.courses) {
      if (c.name === course.name && c.code === course.code) {
        return true;
      }
    }
    return false;
  },
  addGrade(student, courseCode, grade) {
    student.addGrade(courseCode, grade);
    const course = this.courses.find(course => course.code === courseCode);
    if (course) {
      course.grades ||= [];
      course.grades.push(`${student.name}: ${grade}`);
    }
  },
  getReportCard(student) {
    student.courses.forEach(course => {
      console.log(`${course.name}: ${course.grade || 'In progress'}`);
    })
  },
  courseReport(courseName) {
    const course = this.courses.find(course => course.name === courseName);
    if (course.grades) {
      console.log(`=${course.name} Grades=`);
      course.grades.forEach(grade => {
        console.log(grade);
      });
      console.log(`---`);
      console.log(`Course Average: ${this.calculateAverage(course)}`);
    } else {
      return undefined;
    }
  },
  calculateAverage(course) {
    let grades = course.grades.map(grade => {
      return Number(grade.split(': ')[1]);
    });
    return grades.reduce((acc, grade) => acc + grade, 0) / grades.length;
  },
}

let paul = school.addStudent('Paul', '3rd');
school.enrollStudent(paul, {name: 'Math', code: 101 });
school.addGrade(paul, 101, 95);
school.enrollStudent(paul, {name: 'Advanced Math', code: 102 });
school.addGrade(paul, 102, 90);
school.enrollStudent(paul, {name: 'Physics', code: 202 });

let mary = school.addStudent('Mary', '1st');
school.enrollStudent(mary, {name: 'Math', code: 101});
school.addGrade(mary, 101, 91);

let kim = school.addStudent('Kim', '2nd');
school.enrollStudent(kim, {name: 'Math', code: 101});
school.addGrade(kim, 101, 93);
school.enrollStudent(kim, {name: 'Advanced Math', code: 102});
school.addGrade(kim, 102, 90);

console.log(paul);
console.log(mary);
console.log(kim);
school.getReportCard(paul);
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
