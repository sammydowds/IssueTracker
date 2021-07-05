'use strict';
const helpers = require("./helpers.js");

module.exports = function (app) {
  // end point to CRUD issues based on a project (project name)
  app.route('/api/issues/:project')
    .get(async function (req, res){
      let project_name = req.params.project;
	    console.log('req params', req.params);
	    console.log('req query', req.query.test);
	    console.log('req ', req);
	    const issuesFound = await helpers.findIssues({ project_name: project_name, ...req.query});
      res.send(issuesFound);
    })
    .post(async function (req, res){
      let project_name = req.params.project;
      let issue_data = req.body;
	    if (helpers.isValidInput(issue_data)) {
		   	const processedIssueData = helpers.fillMissingFormData(issue_data);
		    	const now = new Date().toISOString();
		    const result = await helpers.createIssue({...processedIssueData, project_name: project_name, open: true, created_on: now, updated_on: now});
		    	res.json(result);
        	} else { 
	    		res.json({error: 'required field(s) missing'});
    		}
    })
    .put(function (req, res){
      let project_name = req.params.project;
      // find and update helper 
    })
    .delete(function (req, res){
      let project_name = req.params.project;
      // use helper to delete
    });  
};
