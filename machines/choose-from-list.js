module.exports = {


  friendlyName: 'Choose from list',


  description: 'Prompt the command-line user to make a choice from a list of options.',


  extendedDescription: '',


  inputs: {

    choices: {
      description: 'The list of choices: the `name` property indicates how the choice will appear in the list.',
      example: [
        {
          name: 'Choice A',
          value: 'choice-a'
        }
      ],
      required: true
    },

    message: {
      description: 'The message to display as a prompt for the command-line user',
      example: 'Please choose one of the following.',
      defaultsTo: 'Please choose one of the following.'
    },

    paginated: {
      description: 'Whether or not the interactive list will be paginated',
      defaultsTo: false,
      example: false
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.'
    }

  },


  fn: function(inputs, exits) {
    var inquirer = require('inquirer');

    inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: inputs.message || 'Please choose one of the following.',
      paginated: inputs.paginated || false,
      choices: inputs.choices
    }], function(answers) {
      console.log('=>',answers.choice);
      return exits.success(answers.choice);
    });
  },

};
