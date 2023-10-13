'use strict';


const assert = require('assert');
const async = require('async');

const topics = require('../src/topics');
const categories = require('../src/categories');
const user = require('../src/user');
const groups = require('../src/groups');

describe('Anonymous feature tests', () => { 
  let globalModUid;
  let topicData;
  let cid;

  before((done) => {
      async.series({
          globalModUid: function (next) {
              user.create({ username: 'globalmod', password: 'globalmodpwd' }, next);
          },
          category: function (next) {
              categories.create({
                  name: 'Test Category',
                  description: 'Test category created by testing script',
              }, next);
          },
      }, (err, results) => {
          if (err) {
              return done(err);
          }

          voterUid = results.voterUid;
          voteeUid = results.voteeUid;
          globalModUid = results.globalModUid;
          cid = results.category.cid;

          topics.post({
              uid: results.voteeUid,
              cid: results.category.cid,
              title: 'Test Topic Title',
              content: 'The content of test topic',
              isAnon: false
          }, (err, data) => {
              if (err) {
                  return done(err);
              }
              topicData = data.topicData;

              groups.join('Global Moderators', globalModUid, done);
          });
      });
  });

  describe('Test on topic posts', () => { 

    it('Non-anonymous topic post is NOT marked as anonymous', async () => {
      const topic = topics.post({
          uid: globalModUid,
          cid: cid,
          title: 'Test Topic Title',
          content: 'The content of test topic',
          isAnon: false
      });
      assert.equal(topic.data.isAnon, false);
    });
  
    it('Anonymous topic post is marked as anonymous', async () => {
      const topic = topics.post({
          uid: globalModUid,
          cid: cid,
          title: 'Test Topic Title',
          content: 'The content of test topic',
          isAnon: true
      });
      assert.equal(topic.data.isAnon, true);
    });
  });

  describe('Test on post replies', () => { 
  
    it('Non-anonymous post reply is NOT marked as anonymous', async () => {
      const reply = topics.reply({
          uid: globalModUid,
          tid: topicData.tid,
          content: 'The content of test reply',
          isAnon: false
      });
      assert.equal(reply.data.isAnon, false);
    });
  
    it('Anonymous post reply is marked as anonymous', async () => {
      const reply = topics.reply({
          uid: globalModUid,
          tid: topicData.tid,
          content: 'The content of test reply',
          isAnon: true
      });
      assert.equal(reply.data.isAnon, true);
    });
  });

});