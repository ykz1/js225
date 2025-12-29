/* 
Implementation of notes is the only area where we need to make some decisions on how to store data.

Notes for a course should be stored as an array of strings, so we can add multiple notes for a course.

One option is to add notes as a property within each course object. 
  courses: [{ name: 'Math', code: 101, notes: ['Some notes', 'Morenotes'] }, ...]

Another option is to create another property on the student object to specifically store notes. 

  notes: {101: ['Some notes', 'More notes'], 102: ['Just one note']}

Both has pros and cons, but since we might want course objects to be more standardized across different student objects, let's go with option 2: creating a notes property on each student.
*/
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    listCourses() {
      console.log(this.courses);
    },
    addCourse(course) {
      if (this.isValidCourse(course)) {
        this.courses.push(course);
        console.log(`Course added.`);
      } else {
        console.log(`Invalid course.`);
      }
    },
    addNote(courseCode, note) {
      this.notes[courseCode] ||= [];
      this.notes[courseCode].push(note);
    },
    viewNotes() {
      Object.entries(this.notes).forEach(([code, notes]) => {
        const courseName = this.getCourseName(code);
        notes = notes.join('; ');
        console.log(`${courseName}: ${notes}`);
      });
    },
    updateNote(courseCode, note) {
      this.notes[courseCode] = [note];
    },
    isValidCourse(course) {
      return typeof course === 'object' && Object.hasOwn(course, 'name') && Object.hasOwn(course, 'code');
    },
    getCourseName(code) {
      const course = this.courses.find(course => course.code === Number(code));
      return course.name;
    }
  }
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"