const Student = require('../app/student');
const assert = require('assert');

describe('Create Tests', () => {
  it('create a user in DB', () => {
    // assert(false);
    const vasu = new Student({ name: 'Vasu' });
    vasu
      .save()
      .then(() => {
        assert(!vasu.isNew);
      })
      .catch(() => {
        console.log('error');
      });
  });
});

// All read tests

describe('Read Tests', () => {
  let reader;
  beforeEach((done) => {
    reader = new Student({ name: 'Reader' });
    reader.save().then(() => {
      done();
    });
  });

  it('Read a User: Reader', (done) => {
    Student.find({ name: 'Reader' }).then((students) => {
      // id is a BSON value
      assert(reader._id.toString() === students[0]._id.toString());
      done();
    });
  });
});

// All delete test
describe('Delete Tests', () => {
  let deleter;

  beforeEach((done) => {
    deleter = new Student({ name: 'Deleter' });
    deleter.save().then(() => done());
  });

  it('A delete test for deleter', (done) => {
    Student.findByIdAndDelete(deleter._id)
      .then(() => Student.findOne({ name: 'Deleter' }))
      .then((student) => {
        assert(student === null);
        done();
      });
  });
});

// All update test
describe('Update tests', () => {
  let updater;
  beforeEach((done) => {
    updater = new Student({ name: 'Updater' });
    updater.save().then(() => done());
  });
  it('Set and Save test', () => {
    updater.set('name', 'UpUpdater');
    updater
      .save()
      .then(() => Student.find({}))
      .then((students) => {
        assert(students[0].name !== 'Updater');
        assert(students[0].name === 'UpUpdater');
      });
  });
});
