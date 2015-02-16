module.exports = {


  friendlyName: 'Choose from list',


  description: 'Prompt the command-line user to make a choice from a list of options.',


  extendedDescription: '',


  inputs: {

    choices: {
      description: 'The list of choices- where each choice is a name/value pair (dictionary).',
      extendedDescription: 'The `name` property indicates how the choice will appear in the list.  The `value` property is used to report which choice was selected, so each `value` should be unique within the list of choices.',
      example: [
        {
          name: 'Choice A',
          value: 'some-unique-identifier'
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
      description: 'Returned the `value` property of the choice that was selected.',
      example: 'some-unique-identifier'
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
