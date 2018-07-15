const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //const course = await Course.findById(courseId);
 // course.author.name = 'Ivan Koretskyy';
  // course.save();

  //second variant
  // const course = await Course.update({_id: courseId},
  // {
  //   $set: {
  //     'author.name': 'Jhon'
  //   }
  // })

  //tor remove subdocument use unset
  const course = await Course.update({_id: courseId},
    {
      $unset: {
        'author': ''
      }
    })
}



async function addAuthor (courseId, author) {
  const course = await Course.findById(courseId);

  course.authors.push(author);
  course.save()

}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = await course.authors.id(authorId);
  author.remove();
  course.save();
}

//updateAuthor('5b4b522c82cc2a283000b17a');
// createCourse('Angular', [
//   new Author({ name: 'Ivan2' }), 
//   new Author({ name: 'Ivan3' })
// ]);


//addAuthor("5b4b5fde51cb172db085a5d5", new Author({name: 'Ivna4'}));

removeAuthor("5b4b5fde51cb172db085a5d5", "5b4b5fde51cb172db085a5d4")