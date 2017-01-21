
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {browserHistory } from 'react-router';


export const Games = new Meteor.Collection('games');

// const gameCode = Math.floor(Math.random()*100000);

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

Meteor.methods({
  'games.insert'(player,connectionId) {
    const gameCode = String(Math.floor(Math.random()*100000));
    let playerId = [player, connectionId]
    playerId=String(playerId);
    check(connectionId, String);
    check(playerId, String);
    check(player, String);
    console.log(playerId);
    browserHistory.push(`game/${gameCode}`)
    Games.insert({
      gameCode:gameCode,
      player:[playerId],
      createdAt: new Date(),
    });
  },
  'games.addPlayer'(gameCode, player, connectionId) {
    check(gameCode, String);
    check(player, String);
    const res=(Games.findOne({gameCode:gameCode}));
    if (res) {
      Games.update(res._id, { $push: { player: [player,connectionId] } });
    } else {
      return null;
    }
  }
});
