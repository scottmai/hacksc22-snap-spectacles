//@input Component.Text textField
//@input SceneObject checkObject

script.api.setChecked = function(bool) {
    script.checkObject.enabled = bool;
};

script.api.setLabel = function(txt) {
    script.textField.text = txt;
};