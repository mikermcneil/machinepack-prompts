module.exports = {


  friendlyName: 'Confirm',


  description: 'Prompt command-line user to confirm with "y" or "n" before proceeding.',


  extendedDescription: '',


  inputs: {

    message: {
      description: 'The message to display as a prompt for the command-line user',
      example: 'Are you sure?',
      defaultsTo: 'Are you sure?'
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    canceled: {
      description: 'The command-line user canceled the operation by choosing "no".'
    },

    success: {
      description: 'The command-line user confirmed by choosing "yes".'
    }

  },


  fn: function(inputs, exits) {
    var inquirer = require('inquirer');

    inquirer.prompt([{
      type: 'confirm',
      name: 'choice',
      message: inputs.message || 'Are you sure?'
    }], function(answers) {
      console.log('=>',answers.choice);
      if (!answers.choice) {
        return exits.canceled();
      }
      return exits.success();
    });
  },

};
