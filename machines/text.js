module.exports = {


  friendlyName: 'Text',


  description: 'Prompt the command-line user for a value entered interactively as a string.',


  extendedDescription: '',


  inputs: {

    message: {
      description: 'The message to display as a prompt for the command-line user',
      example: 'Please enter a value.',
      defaultsTo: 'Please enter a value.'
    },

    protect: {
      description: 'Whether or not to hide keystrokes using "*" characters (i.e. like a password field)',
      example: true,
      defaultsTo: false,
    },

    expectJson: {
      description: 'Whether or not to expect/validate JSON',
      example: true,
      defaultsTo: false
    },

    exampleValue: {
      description: 'An example value that will be displayed if the command-line user starts slamming <ENTER>',
      example: 'why doesn\'t my moose lay as well as thy goose?'
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
      example: 'some string typed by the user'
    }

  },


  fn: function(inputs, exits) {
    var _ = require('lodash');
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
      type: inputs.protect ? 'password' : 'input',
      name: 'value',
      validate: function _isTruthy(value){
        var parsedValue;
        // Value is truthy
        if (value) {
          if (inputs.expectJson){
            try {
              parsedValue = JSON.parse(value);
              // Don't allow null
              if (_.isNull(parsedValue)) {
                return '`null` is not allowed, sorry';
              }
              // Allow booleans, strings, numbers, objects, arrays
              return true;
            }
            catch (e){}
            return 'enter valid JSON (don\'t forget double quotes!)';
          }
          return true;
        }

        // Value is falsy
        else {
          if (inputs.exampleValue) {
            return 'e.g. '+inputs.exampleValue;
          }
          return false;
        }
      },
      message: inputs.message || 'Please enter a value.'
    }], function(answers) {
      if (spinlock) return;
      spinlock = true;
      return exits.success(answers.value);
    });
  },

};
