function showInputText(radioButtonID, inputID) {
  if($(radioButtonID).prop("checked")) {
    $(inputID).show();
    $(inputID).focus();
  } else {
    $(inputID).hide();
  }
}