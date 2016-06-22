(function () {
  'use strict'
  /* ------------------------------------------------------------
  * DOM Elements
  * Store references to the elements that will be referred to by the app
  * ---------------------------------------------------------- */
  const DOM = {
    results: {
      summary: document.getElementById('results-summary'),
      body: document.getElementById('results-body')
    },
    forms: {
      unanswered: document.getElementById('unanswered-getter'),
      inspiration: document.getElementById('inspiration-getter'),
    }
  }

  /* ------------------------------------------------------------
  * DOM Updates
  * Helper functions to update the DOM with new results
  * ---------------------------------------------------------- */
  function updateResultsBody (elements) {
    DOM.results.body.innerHTML = elements.join('')
  }

  function updateResultsSummary (summary) {
    DOM.results.summary.innerHTML = summary
  }

  /* ------------------------------------------------------------
  * Element templates
  * Helper functions to generate the HTML for each search result
  * ---------------------------------------------------------- */
  function getResultsSummaryMarkup (query, numResults) {
    return numResults + ' results for <strong>' + query + '</strong>'
  }

  function getQuestionMarkup (question) {
    /**
    * @param {Object} question: Question object from SO API response
    * @returns {String} HTML markup to be added to the page for given question
    */
    // title, link, username, reputation
    return (
      '<div>Question Title: ' + question.title + '</div>' +
      '<div>Link: <a href="' + question.link + '">Click here</a></div>' +
      '<div>Owner: ' + question.owner.display_name + '</div>' +
      '<div>Repution: ' + question.owner.reputation + '</div>' +
      '</br>'
    )
  }

  function getAnswererMarkup (answerer) {
    /**
    * @param {Object} answerer: User object from SO API response
    * @returns {String} HTML markup to be added to the page for given user
    */
    return (
      '<div>User: ' + answerer.user.display_name + '</div>' +
      '<div>Profile Link: <a href="' + answerer.user.link + '">Click here</a></div>' +
      '<div>Avatar: <img src="' + answerer.user.profile_image + '" /></div>' +
      '<div>Repution: ' + answerer.user.reputation + '</div>' +
      '</br>'
    )
  }

  /* ------------------------------------------------------------
  * API Requests
  * Helper functions to perform the API requests and process the results
  * ---------------------------------------------------------- */
  function getUnanswered (tags) {
    /**
    * Makes AJAX request to get unanswered questions for tag and updates results
    * @param {String} tags: Comma separated string of SO tags for search
    * @returns {void}
    */

    var query = {
      order: 'desc',
      sort: 'activity',
      tagged: tags,
      site: 'stackoverflow'
    }

    var baseUrl = 'https://api.stackexchange.com'
    var path = '/2.2/questions/unanswered'
    var queryString = Object.keys(query).map(function (key) {
      return key + '=' + query[key]
    }).join('&')

    // console.log(queryString);
    // console.log(baseUrl + path + '?' + queryString);
    // console.log('Me get Unanswered: https://api.stackexchange.com/2.2/questions/unanswered?order=desc&sort=activity&tagged=' + tags + '&site=stackoverflow')

    var xhr = new XMLHttpRequest()

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200)
    //   console.log(xhr.response)
    // }

    xhr.addEventListener('load', function() {
      if(xhr.status === 200) {
        var response = JSON.parse(xhr.response)
        var summary = getResultsSummaryMarkup(tags, response.items.length)
        var questions = response.items.map(getQuestionMarkup)

        updateResultsSummary(summary)
        updateResultsBody(questions)
      }
    })
    xhr.open('GET', baseUrl + path + '?' + queryString)
    xhr.send()
  }
  function getInspiration (tag) {
    /**
    * Makes AJAX request to get top answerers for tag and updates results
    * @param {String} tag: SO tag for which to get top answerers
    * @returns {void}
    */

    var query = {
      site: 'stackoverflow'
    }

    var baseUrl = 'https://api.stackexchange.com'
    var path = '/2.2/tags/' + tag + '/top-answerers/all_time'

    var queryString = Object.keys(query).map(function (key) {
      return key + '=' + query[key]
    })

    // console.log(queryString);
    // console.log(baseUrl + path + '?' + queryString);
    // console.log('Me topanswerers: https://api.stackexchange.com/2.2/tags/' + tag + '/top-answerers/all_time?site=stackoverflow')

    var xhr = new XMLHttpRequest()

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200)
    //   console.log(xhr.response)
    // }

    xhr.addEventListener('load', function() {
      if(xhr.status === 200) {
        var response = JSON.parse(xhr.response)
        var summary = getResultsSummaryMarkup(tag, response.items.length)
        var answerers = response.items.map(getAnswererMarkup)

        updateResultsSummary(summary)
        updateResultsBody(answerers)
      }
    })
    xhr.open('GET', baseUrl + path + '?' + queryString)
    xhr.send()
  }

  /* ------------------------------------------------------------
  * Event listeners
  * Attach the appropriate callbacks to the forms submit event
  * ---------------------------------------------------------- */
  DOM.forms.unanswered.addEventListener('submit', (e) => {
    e.preventDefault()
    const tags = e.target.firstElementChild.value
    getUnanswered(tags)
  })

  DOM.forms.inspiration.addEventListener('submit', (e) => {
    e.preventDefault()
    const tags = e.target.firstElementChild.value
    getInspiration(tags)
  })
})()
