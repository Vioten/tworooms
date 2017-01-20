import { Meteor } from 'meteor/meteor';
import '../imports/api/games.js';
import { Games } from '../api/games.js';


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.onConnection(function (conn) {
    var connId = conn.id;

    console.log('welcome, ', connId);
    conn.onClose(function () {
      console.log('bye ', connId);
    });
  });
  Meteor.publish('lists.public', function() {
  return Games.find({
    userId: {$exists: false}
  }, {
    fields: Lists.publicFields
  });
});
});
