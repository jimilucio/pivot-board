import querystring from 'querystring';
import _ from 'lodash';

let Pivotal;

/**
 * Pivotal API Interface
 * @constructor
 * @param {string} apiToken Pivotal API Token
 */
Pivotal = function Pivotal (apiToken) {
  this.apiToken = apiToken;
  this.baseUrl = 'https://www.pivotaltracker.com/services/v5/';
};

/**
 * Update a story
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   storyId   Pivotal story id
 * @param  {Object}   [params]  Extra parameters
 * @param  {Function} [callback]  function(error, response)
 */
Pivotal.prototype.updateStory = function updateStory (projectId, storyId, params, callback) {
  this.api('put', 'projects/' + projectId + '/stories/' + storyId, {
    json: params
  }, callback);
};

/**
 * Obtains a story
 * @param  {String}   storyId   Pivotal story id
 * @param  {Function} [callback]  function(error, response)
 */
Pivotal.prototype.getStory = function getStory (storyId, callback) {
  this.api('get', '/stories/' + storyId, {}, callback);
};

/**
 * Obtains list of projects
 * @param  {Function} [callback]  function(error, projects)
 */
Pivotal.prototype.getProjects = function getProjects (callback) {
  this.api('get', '/projects', {}, callback);
};

/**
 * Get paginated stories from project
 * @param  {String}   projectId   Pivotal project id
 * @param  {Object}   [options]   Extra options
 * @param  {Function} [callback]  function(stories, pagination, callback(error or true to stop pagination))
 * @param  {Function} [completed] function(error)
 * @param  {Integer}  [offset]    Initial pagination offset
 * @param  {Integer}  [limit]     Pagination limit for each response
 */
Pivotal.prototype.getStories = function getStories (projectId, options, callback, completed, offset, limit) {
  this.paginated('projects/' + projectId + '/stories', offset || 0, limit || 128, options, callback, completed);
};

/**
 * Get paginated activity from project
 * @param  {String}   projectId   Pivotal project id
 * @param  {Object}   [options]   Extra options
 * @param  {Function} [callback]  function(events, pagination, callback(error or true to stop pagination))
 * @param  {Function} [completed] function(error)
 * @param  {Integer}  [offset]    Initial pagination offset
 * @param  {Integer}  [limit]     Pagination limit for each response
 */
Pivotal.prototype.getActivity = function getActivity (projectId, options, callback, completed, offset, limit) {
  this.paginated('projects/' + projectId + '/activity', offset || 0, limit || 128, options, callback, completed);
};

/**
 * Get activity for story
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   storyId   Pivotal story id
 * @param  {Function} [callback]  function(error, events)
 * @param  {Object}   [options]   Extra options
 */
Pivotal.prototype.getStoryActivity = function getStoryActivity (projectId, storyId, callback, options) {
  this.api('get', 'projects/' + projectId + '/stories/' + storyId + '/activity', {
    qs: options || {}
  }, callback);
};

/**
 * Get API token owner activity
 * @param  {Function} [callback]  function(error, events)
 * @param  {Object}   [options]   Extra options
 */
Pivotal.prototype.getMyActivity = function getMyActivity (callback, options) {
  this.api('get', 'my/activity', {
    qs: options || {}
  }, callback);
};

/**
 * Get tasks for story
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   storyId   Pivotal story id
 * @param  {Function} [callback]  function(error, tasks)
 */
Pivotal.prototype.getTasks = function getTasks (projectId, storyId, callback) {
  this.api('get', 'projects/' + projectId + '/stories/' + storyId + '/tasks', {}, callback);
};

/**
 * Add story task
 * @param  {String}   projectId   Pivotal project id
 * @param  {String}   storyId     Pivotal story id
 * @param  {String}   description Description
 * @param  {int}      position    Position
 * @param  {Function} [callback]  function(error, label)
 */
Pivotal.prototype.addTask = function addTask (projectId, storyId, description, position, callback) {
  this.api('post', 'projects/' + projectId + '/stories/' + storyId + '/tasks', {
    body: {
      description: description,
      position: position
    }
  }, callback);
};

/**
 * Get paginated iterations for project
 * @param  {String}   projectId   Pivotal project id
 * @param  {Object}   [options]   Extra options
 * @param  {Function} [callback]  function(iterations, pagination, callback(error or true to stop pagination))
 * @param  {Function} [completed] function(error)
 * @param  {Integer}  [offset]    Initial pagination offset
 * @param  {Integer}  [limit]     Pagination limit for each response
 */
Pivotal.prototype.getIterations = function getIterations (projectId, options, callback, completed, offset, limit) {
  this.paginated('projects/' + projectId + '/iterations', offset || 0, limit || 128, options, callback, completed);
};

/**
 * Get current iteration stories from project
 * @param  {String} projectId Pivotal project id
 * @param  {Function} [callback]  function(error, iterations)
 */
Pivotal.prototype.getCurrentIterations = function (projectId, callback) {
  this.api('get', 'projects/' + projectId + '/iterations', {
    qs: {
      scope: 'current',
      date_format: 'millis'
    }
  }, function (err, iterations) {
    if (_.isFunction(callback)) {
      if (err || !iterations) {
        callback(err);
      } else {
        callback(false, iterations);
      }
    }
  });
};

/**
 * Get memberships for project
 * @param  {String}   projectId Pivotal project id
 * @param  {Function} [callback]  function(error, memberships)
 */
Pivotal.prototype.getMemberships = function updateStory (projectId, callback) {
  this.api('get', 'projects/' + projectId + '/memberships', {}, callback);
};

/**
 * Get comments from story
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   storyId   Pivotal story id
 * @param  {Function} [callback]  function(error, comments)
 */
Pivotal.prototype.getComments = function getStories (projectId, storyId, callback) {
  this.api('get', 'projects/' + projectId + '/stories/' + storyId + '/comments', {}, callback);
};

/**
 * Export stories from Pivotal
 * @param  {String[]}  stories   List of story id's
 * @param  {Function}  [callback]  function(error, response)
 */
Pivotal.prototype.exportStories = function exportStories (stories, callback) {
  this.api('post', 'stories/export', {
    body: querystring.stringify({
      'ids[]': stories
    })
  }, callback);
};

// /**
//  * Post attachment to story
//  * @param  {String}   projectId Pivotal project id
//  * @param  {String}   storyId   Pivotal story id
//  * @param  {String}   content   Attachment content
//  * @param  {String}   filename  Attachment filename
//  * @param  {String}   type      Content type of attachment
//  * @param  {String}   comment   Comment text
//  * @param  {Function} [callback]  function(error, response)
//  */
// Pivotal.prototype.postAttachment = function postAttachment (projectId, storyId, content, filename, type, comment, callback) {
//   var that = this;
//   request.post({
//     url: `https://www.pivotaltracker.com/services/v5/projects/${projectId}/uploads`,
//     multipart: [{
//       'Content-Disposition': `form-data; name="file"; filename="${filename}"`,
//       'Content-Type': type,
//       'body': content
//     }],
//     headers: {
//       'X-TrackerToken': that.apiToken
//     }
//   }, function (err, res, upload) {
//     if (err || upload.kind === 'error') {
//       callback(err, {
//         success: false,
//         error: upload ? upload.error + ' (' + upload.general_problem + ')' : err
//       });
//     } else {
//       that.api('post', 'projects/' + projectId + '/stories/' + storyId + '/comments', {
//         json: {
//           text: comment,
//           file_attachments: [JSON.parse(upload)]
//         }
//       }, callback);
//     }
//   });
// };

/**
 * Get all labels in project
 * @param  {String}   projectId Pivotal project id
 * @param  {Function} [callback]  function(error, labels)
 */
Pivotal.prototype.getLabels = function getLabels (projectId, callback) {
  this.api('get', 'projects/' + projectId + '/labels', {}, callback);
};

/**
 * Get labels on story
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   storyId   Pivotal story id
 * @param  {Function} [callback]  function(error, labels)
 */
Pivotal.prototype.getStoryLabels = function getStoryLabels (projectId, storyId, callback) {
  this.api('get', 'projects/' + projectId + '/stories/' + storyId + '/labels', {}, callback);
};

/**
 * Add story label
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   storyId   Pivotal story id
 * @param  {String}   name      Name of label
 * @param  {Function} [callback]  function(error, label)
 */
Pivotal.prototype.addStoryLabel = function addStoryLabel (projectId, storyId, name, callback) {
  this.api('post', 'projects/' + projectId + '/stories/' + storyId + '/labels', {
    body: {
      name: name
    }
  }, callback);
};

/**
 * Create label
 * @param  {String}   projectId Pivotal project id
 * @param  {String}   name      Name of label
 * @param  {Function} [callback]  function(error, label)
 */
Pivotal.prototype.createLabel = function createStory (projectId, name, callback) {
  this.api('post', 'projects/' + projectId + '/labels', {
    body: {
      name: name
    }
  }, callback);
};

/**
 * Create new Pivotal story
 * @param  {String}   projectId Pivotal project id
 * @param  {Object}   [params]  Story parameters
 * @param  {Function} [callback]  function(error, story)
 */
Pivotal.prototype.createStory = function createStory (projectId, params, callback) {
  this.api('post', 'projects/' + projectId + '/stories', {
    body: params
  }, callback);
};

Pivotal.prototype.paginated = function (path, offset, limit, options, callback, completed) {
  var that = this;
  var _options = {
    qs: _.extend({
      offset: offset,
      limit: limit,
      envelope: true
    }, options)
  };
  this.api('get', path, _options, function (err, res) {
    if (err || !res.pagination) {
      completed && completed(err || res);
    } else {
      offset += res.pagination.returned;
      callback && callback(res.data, res.pagination, function (err) {
        if (!err) {
          var left = res.pagination.total - offset;
          if (left > 0) {
            that.paginated(path, offset, Math.min(left, limit), options, callback, completed);
          } else {
            completed && completed();
          }
        } else {
          completed && completed(err);
        }
      });
    }
  });
};

Pivotal.prototype.api = function api (method, path, options, callback) {
  const xhr = new window.XMLHttpRequest();
  if (options.qs) {
    xhr.open(method, `${this.baseUrl}${path}?${querystring.stringify(options.qs)}`);
  } else {
    xhr.open(method, `${this.baseUrl}${path}`);
  }
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-TrackerToken', this.apiToken);

  xhr.onload = function () {
    if (_.isFunction(callback)) {
      callback(undefined, xhr.response);
    }
  };

  xhr.onerror = function (err) {
    console.error("Houston, we've got a problem.", err, xhr);
    if (_.isFunction(callback)) {
      callback(err);
    }
  };
  xhr.send();
};

export default Pivotal;
