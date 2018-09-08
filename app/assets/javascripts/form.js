//  --------------    Text field  ---------------- //

function validateInputField() {
  var valid = true;
  $(".input-field-required").each(function() {
    if($(this).val() === "") {
      valid = false;
    }
  });
  return valid;
}

//  --------------    Radio and Checkbox Group  ---------------- //

function getAllChoicesGroup(choices) {
  var groups = new Set();
  choices.each(function() {
    groups.add(this.name);
  });
  return groups;
}

function validateSingleGroup(input_name) {
  var valid = true;
  var group = "input[name='"+ input_name + "']:checked"
  if (!$(group).length) {
    valid = false;
  }
  return valid;
}

function validateChoicesField(choices) {
  var valid = true;
  var names = getAllChoicesGroup(choices);
  names.forEach(function(name) {
    if(!validateSingleGroup(name)) valid = false;
  });
  return valid;
}

function checkOtherFieldFilled(radioButtonID, inputID) {
  if($(radioButtonID).prop("checked") && $(inputID).val()) {
    return true;
  }
  return false;
}

//  --------    Validate Other Field are filled  --------- //
function validateOtherFiled() {
  var valid = true;
  var eles = $(".text-input-other").siblings(":radio");
  eles.each(function() {
    if($(this).is(':checked')) {
      var initial_val = $(this).val().split(":")[0];
      var text_input = $(this).siblings(".text-input-other");
      if(text_input.val() == "") {
        valid = false;
      } else {
        var new_val = initial_val + ": " + text_input.val();
        $(this).val(new_val)
      }
    } else {
      $(this).siblings(".input-error").hide();
    }
  });
  return valid;
}

function showErrorMsgOtherField() {
  $(".text-input-other").on("input focusout", function(event) {
    if($(this).val() == "") {
      $(this).siblings(".input-error").show();
    } else {
      $(this).siblings(".input-error").hide();
    }
    enableSubmitButtonOrNot();
  });
}

//  --------------    Validate Form  ---------------- //

function validateForm() {
  validateOtherFiled();
  var valid = false;
  var allRadios = $(".radio-field-required");
  var allCheckboxes = $(".checkbox-field-required");
  if(validateInputField() && validateChoicesField(allRadios) && validateChoicesField(allCheckboxes) && validateOtherFiled()) {
    valid = true;
  }
  return valid;
}

//  --------------    Enable button  ---------------- //

function enableSubmitButtonOrNot() {
  if(validateForm()) {
    $(".submit-button").removeClass("disabled");
    $(".form-validation-msg").hide();
  } else {
    $(".submit-button").addClass("disabled");
    $(".form-validation-msg").show();
  }
}

$(document).ready(function(){
  enableSubmitButtonOrNot();
  showErrorMsgOtherField();

  $(".input-field-required").focusout(function(event) {
    // check if form required field are filled
    enableSubmitButtonOrNot();
    
    // show error if required field not filled
    var node = event.target;
    if(node.value) {
      $(this).siblings(".input-error").hide();
    } else {
      $(this).siblings(".input-error").show();
    }
  });


  // check if reuiqred radio fields are filled
  $(".radio-field-required").on("focusout click", function() {
    enableSubmitButtonOrNot();
    var allRadios = $("input[name='"+ this.name + "']");
    if(validateChoicesField(allRadios)) {
      $(this).parent().parent().siblings(".input-error").hide();
    } else {
      $(this).parent().parent().siblings(".input-error").show();
    }
  });

  // check if required checkbox fields are filled
  $(".checkbox-field-required").on("focusout click", function() {
    enableSubmitButtonOrNot();
    var allCheckboxes = $("input[name='"+ this.name + "']");
    if(validateChoicesField(allCheckboxes)) {
      $(this).parent().parent().siblings(".input-error").hide();
    } else {
      $(this).parent().parent().siblings(".input-error").show();
    }
  });

});