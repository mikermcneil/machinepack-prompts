module.exports = {


  friendlyName: 'Multiselect',


  description: 'Prompt the command-line user to check/uncheck items from a list of options.',


  extendedDescription: '',


  inputs: {

    choices: {
      description: 'The list of checkboxes- where each choice is a name/value pair (dictionary).',
      extendedDescription: 'The `name` property indicates how the choice will appear in the list.  The `value` property is used to report which choice was selected, so each `value` should be unique within the list of choices. If `checked` is set true, the choice will be pre-selected.  If `disabled` is set to a string other than `""`, the user will not be able to select this choice, and the string will be displayed to the right of the checkbox.',
      example: [
        {
          name: 'Choice A',
          value: 'some-unique-identifier',
          checked: false,
          disabled: ''
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

    // sigint: {
    //   friendlyName: 'User pressed CTRL+C',
    //   description: 'The command-line user canceled by pressing CTRL+C.'
    // },

    success: {
      description: 'Returned the `value` property of the choice that was selected.',
      example: ['some-unique-identifier']
    }

  },


  fn: function(inputs, exits) {
    var inquirer = require('inquirer');

    var spinlock;

    // Since inquirer doesn't allow us to tap into this,
    // we'll handle it here with the help of a spin-lock to ensure
    // that no issues arise.
    //
    // ...but.... this doesn't work yet.
    //////////////////////////////////////////////////////////////////////////////
    // process.on( 'SIGINT', function (){
    //   if (spinlock) return;
    //   spinlock = true;
    //   return exits.sigint();
    // });

    inquirer.prompt([{
      type: 'checkbox',
      name: 'choices',
      message: inputs.message || 'Please select from the following.',
      paginated: inputs.paginated || false,
      choices: inputs.choices
    }], function(answers) {
      if (spinlock) return;
      spinlock = true;
      return exits.success(answers.choices);
    });
  },

};
