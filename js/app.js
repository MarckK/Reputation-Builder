'use strict'

;(function () {
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
      unanswered: document.getElementById('unanswered'),
      inspiration: document.getElementById('inspiration'),
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

  function getResultsSummaryMarkup (query, numResults) {
    return numResults + ' results for <strong>' + query + '</strong>'
  }

  /* ------------------------------------------------------------
  * Element templates
  * Helper functions to generate the HTML for each search result
  * ---------------------------------------------------------- */
  function getQuestionMarkup (question) {
    /**
    * @param {Object} question: Question object from SO API response
    * @returns {String} HTML markup to be added to the page for given question
    */
  }

  function getAnswererMarkup (answerer) {
    /**
    * @param {Object} answerer: User object from SO API response
    * @returns {String} HTML markup to be added to the page for given user
    */
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
  }

  function getInspiration (tag) {
    /**
    * Makes AJAX request to get top answerers for tag and updates results
    * @param {String} tag: SO tag for which to get top answerers
    * @returns {void}
    */
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
