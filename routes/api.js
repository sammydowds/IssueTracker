'use strict';
const helpers = require("./helpers.js");

module.exports = function (app) {
  // end point to CRUD issues based on a project (project name)
  app.route('/api/issues/:project')
    .get(async function (req, res){
      let project_name = req.params.project;
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
	// NOTE: probably could add a middleware to catch when we should res alternate error msgs
    .put(async function (req, res){
      let project_name = req.params.project;
		    const hasBodyAndId = !!req.body && !!req.body._id;
		if (hasBodyAndId) {
			const issue_id = req.body._id;
			const issue_payload = delete req.body._id; 
			if (!helpers.isInputEmptyStrings(issue_payload)) {
				const now = new Date().toISOString();
				const updatedIssue = await helpers.updateIssue(issue_id, { ...req.body, updated_on: now } );
				if (updatedIssue) {
					res.json({result: 'successfully updated', _id: issue_id});
				} else {
					res.json({error: 'could not update', _id: issue_id});
				}
			} else {
				res.json({ error: 'no update field(s) sent', _id: issue_id});	
			}
		} else {
			res.json({error: 'missing _id'});
		}
    }) 
    .delete(function (req, res){
      let project_name = req.params.project;
      // use helper to delete
    });  
};
