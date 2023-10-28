# Command 1

    npm run jalangi install/jalangi2/tests/octane/deltablue.js

# Description 1

This line of command runs jalangi on one of its files for testing.

# Output 1

    > nodebb@2.8.1 jalangi
    > node install/jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis install/jalangi2/src/js/sample_analyses/ChainedAnalyses.js --analysis install/jalangi2/src/js/sample_analyses/dlint/Utils.js --analysis install/jalangi2/src/js/sample_analyses/dlint/CheckNaN.js --analysis install/jalangi2/src/js/sample_analyses/dlint/FunCalledWithMoreArguments.js --analysis install/jalangi2/src/js/sample_analyses/dlint/CompareFunctionWithPrimitives.js --analysis install/jalangi2/src/js/sample_analyses/dlint/ShadowProtoProperty.js --analysis install/jalangi2/src/js/sample_analyses/dlint/ConcatUndefinedToString.js --analysis install/jalangi2/src/js/sample_analyses/dlint/UndefinedOffset.js install/jalangi2/tests/octane/deltablue.js

    Function at (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/tests/octane/deltablue.js:653:36:653:55) called 5 time(s) with more arguments that expected.

# Command 2

    npm run jalangi src/posts/index.js 

# Description 2

This line of command runs jalangi on one of the files in this project.

# Output 2

    > nodebb@2.8.1 jalangi
    > node install/jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis install/jalangi2/src/js/sample_analyses/ChainedAnalyses.js --analysis install/jalangi2/src/js/sample_analyses/dlint/Utils.js --analysis install/jalangi2/src/js/sample_analyses/dlint/CheckNaN.js --analysis install/jalangi2/src/js/sample_analyses/dlint/FunCalledWithMoreArguments.js --analysis install/jalangi2/src/js/sample_analyses/dlint/CompareFunctionWithPrimitives.js --analysis install/jalangi2/src/js/sample_analyses/dlint/ShadowProtoProperty.js --analysis install/jalangi2/src/js/sample_analyses/dlint/ConcatUndefinedToString.js --analysis install/jalangi2/src/js/sample_analyses/dlint/UndefinedOffset.js src/posts/index.js

    Failed to instrument 'use strict';

    const _ = require('lodash');

    const db = require('../database');
    const utils = require('../utils');
    const user = require('../user');
    const privileges = require('../privileges');
    const plugins = require('../plugins');

    const Posts = module.exports;

    require('./data')(Posts);
    require('./create')(Posts);
    require('./delete')(Posts);
    require('./edit')(Posts);
    require('./parse')(Posts);
    require('./user')(Posts);
    require('./topics')(Posts);
    require('./category')(Posts);
    require('./summary')(Posts);
    require('./recent')(Posts);
    require('./tools')(Posts);
    require('./votes')(Posts);
    require('./bookmarks')(Posts);
    require('./queue')(Posts);
    require('./diffs')(Posts);
    require('./uploads')(Posts);

    Posts.exists = async function (pids) {
        return await db.exists(
            Array.isArray(pids) ? pids.map(pid => `post:${pid}`) : `post:${pids}`
        );
    };

    Posts.getPidsFromSet = async function (set, start, stop, reverse) {
        if (isNaN(start) || isNaN(stop)) {
            return [];
        }
        return await db[reverse ? 'getSortedSetRevRange' : 'getSortedSetRange'](set, start, stop);
    };

    Posts.getPostsByPids = async function (pids, uid) {
        if (!Array.isArray(pids) || !pids.length) {
            return [];
        }
        let posts = await Posts.getPostsData(pids);
        posts = await Promise.all(posts.map(Posts.parsePost));
        const data = await plugins.hooks.fire('filter:post.getPosts', { posts: posts, uid: uid });
        if (!data || !Array.isArray(data.posts)) {
            return [];
        }
        return data.posts.filter(Boolean);
    };

    Posts.getPostSummariesFromSet = async function (set, uid, start, stop) {
        let pids = await db.getSortedSetRevRange(set, start, stop);
        pids = await privileges.posts.filter('topics:read', pids, uid);
        const posts = await Posts.getPostSummaryByPids(pids, uid, { stripTags: false });
        return { posts: posts, nextStart: stop + 1 };
    };

    Posts.getPidIndex = async function (pid, tid, topicPostSort) {
        const set = topicPostSort === 'most_votes' ? `tid:${tid}:posts:votes` : `tid:${tid}:posts`;
        const reverse = topicPostSort === 'newest_to_oldest' || topicPostSort === 'most_votes';
        const index = await db[reverse ? 'sortedSetRevRank' : 'sortedSetRank'](set, pid);
        if (!utils.isNumber(index)) {
            return 0;
        }
        return utils.isNumber(index) ? parseInt(index, 10) + 1 : 0;
    };

    Posts.getPostIndices = async function (posts, uid) {
        if (!Array.isArray(posts) || !posts.length) {
            return [];
        }
        const settings = await user.getSettings(uid);

        const byVotes = settings.topicPostSort === 'most_votes';
        let sets = posts.map(p => (byVotes ? `tid:${p.tid}:posts:votes` : `tid:${p.tid}:posts`));
        const reverse = settings.topicPostSort === 'newest_to_oldest' || settings.topicPostSort === 'most_votes';

        const uniqueSets = _.uniq(sets);
        let method = reverse ? 'sortedSetsRevRanks' : 'sortedSetsRanks';
        if (uniqueSets.length === 1) {
            method = reverse ? 'sortedSetRevRanks' : 'sortedSetRanks';
            sets = uniqueSets[0];
        }

        const pids = posts.map(post => post.pid);
        const indices = await db[method](sets, pids);
        return indices.map(index => (utils.isNumber(index) ? parseInt(index, 10) + 1 : 0));
    };

    Posts.modifyPostByPrivilege = function (post, privileges) {
        if (post && post.deleted && !(post.selfPost || privileges\['posts:view_deleted'\])) {
            post.content = '\[\[topic:post_is_deleted\]\]';
            if (post.user) {
                post.user.signature = '';
            }
        }
    };

    require('../promisify')(Posts);

    /Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/src/js/instrument/esnstrument.js:1952
                    throw ex;
                    ^

    SyntaxError: Unexpected token (30:21)
        at pp$4.raise (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:2893:15)
        at pp.unexpected (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:697:10)
        at pp.semicolon (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:674:66)
        at pp$1.parseExpressionStatement (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:1153:10)
        at pp$1.parseStatement (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:888:26)
        at pp$1.parseTopLevel (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:754:23)
        at Parser.parse (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:554:17)
        at Function.parse (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:577:37)
        at Object.parse (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/node_modules/acorn/dist/acorn.js:5057:19)
        at transformString (/Users/peternf/Desktop/fall23-nodebb-op/install/jalangi2/src/js/instrument/esnstrument.js:1863:28) {
    pos: 730,
    loc: Position { line: 30, column: 21 },
    raisedAt: 738
    }

    Node.js v20.5.1
