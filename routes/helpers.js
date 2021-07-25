const mongoose = require('mongoose');

// create DB client
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});

// issue schema 
const issueSchema = new mongoose.Schema(
  {
    issue_title: String,
    issue_text: String,
    created_on: String,
    updated_on: String,
    created_by: String,
    assigned_to: String,
    open: Boolean,
    status_text: String, 
    project_name: String
  }
); 

const Issue = mongoose.model('Issue', issueSchema); 

const createIssue = async (data) => {
  	const newIssue = new Issue(data);
	const saveResult = await newIssue.save();
  return saveResult;
};

const deleteIssue = (data) => {
  // check if it exists
  // delete if it does
};
const updateIssue = async (id, data) => {
	const updatedIssue = await Issue.findByIdAndUpdate(id, data);
	console.log('findByIdAndUpdate returned', updatedIssue);
	return updatedIssue;
};

const findIssues = async (filters) => {
  const issues = await Issue.find(filters).exec(); 
  return issues;
};

const isValidInput = (input) => {
	const required_fields = ['issue_title', 'issue_text', 'created_by'];
	for (let field of required_fields) {
		if (input[field] && input[field] !== '') {
			continue;
		} else {
			return false;
		}
	}
	return true;
}

const isInputEmptyStrings = (input) => {
	console.log('input passed to empty string test', input); 
	for (let value in input) {
		if (value === '') {
			continue;
		} else {
			return false;
		}
	}
	return true;
}

const fillMissingFormData = (input) => {
	// todo: isolate as const and create scheme from this
	const string_fields = ['issue_title', 'issue_text', 'created_on', 'updated_on', 'created_by', 'assigned_to', 'status_text', 'project_name'];
	for (let field of string_fields) {
		if (!input[field]) {
			input[field] = '';
		};
		continue;
	};
	return input;
}
module.exports = { isInputEmptyStrings, fillMissingFormData, findIssues, deleteIssue, updateIssue, createIssue, isValidInput };
