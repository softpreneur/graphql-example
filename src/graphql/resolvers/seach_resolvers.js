var Fuse = require('fuse.js');
//Importing list of schools
import school from '../../services/schools';
var schools = Object.values(school);
//Importing list of faculties
import faculty from '../../services/faculties';
var faculties = Object.values(faculty);
//Importing list of courses
import course from '../../services/courses';
var courses = Object.values(course);
export default {
  //Seaching list of schools....
  get_schools: async (_, { char }, { user }) => {
    try {
          //Options for search
          let options = { shouldSort: true, threshold: 0.8, location: 0, distance: 100, maxPatternLength: 32, minMatchCharLength: 1, keys: ["name", "code"] };
          console.log(schools.length);
          let fuse = new Fuse(schools, options);
          let result = fuse.search(char);
          return result;
        } catch (error) {
      throw error;
    }
  },
  //Searching the list of faculties
  get_faculties: async (_, { char }, { user }) => {
      try {
          //Options for search
          let options = { shouldSort: true, threshold: 0.8, location: 0, distance: 100, maxPatternLength: 32, minMatchCharLength: 1, keys: ["name"] };
          console.log(faculties.length);
          let fuse = new Fuse(faculties, options);
          let result = fuse.search(char);
          return result;
      } catch (error){
          throw error;
      }
  }, 
  //Searching the list of courses......
  get_courses: async (_, { char }, { user }) => {
      try {
          //Options for search
          let options = { shouldSort: true, threshold: 0.8, location: 0, distance: 100, maxPatternLength: 32, minMatchCharLength: 1, keys: ["name"] };
          console.log(courses.length);
          let fuse = new Fuse(courses, options);
          let result = fuse.search(char);
          return result;
      } catch (error){
          throw error;
      }
  }
};