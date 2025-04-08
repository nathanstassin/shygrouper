// GLOBAL VARIABLES
var activeLabelDropdown; 
// TODO: 
// 1. Find Label list from user preferences (?)
// 2. Add square labels next to each item in the array 
var labelList = ['None', 'Red', 'Yellow', 'Aqua', 'Pink', 'Lavender', 'Peach', 'Sea Foam', 'Blue', 'Green', 'Purple', 'Orange', 'Brown', 'Fuchsia', 'Cyan', 'Sandstone', 'Dark Green'];
var clickablesWidth = 150;
var clickablesHeight = 25; 

(function(thisObj) {
    var myScriptPal = buildUI(thisObj);
    if (myScriptPal instanceof Window) {
        myScriptPal.center();
        myScriptPal.show();
    } else {
        myScriptPal.layout.layout(true);
    }
})(this);

function buildUI(thisObj) {
    var scriptName = "ShyGrouper";
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", scriptName, undefined, {resizeable: true});

    // __________________UI Markdown__________________ //
    myPanel.orientation = 'column';
    myPanel.alignChildren = ['fill', 'top'];
    myPanel.spacing = 10;
    myPanel.margins = 16;

    // Active Label Dropdown 🔽
    var activeLabelDropdownInstruction = myPanel.add("statictext", undefined, "Select a Layer Label:");
    activeLabelDropdownInstruction.alignment = ["left", "top"];

    activeLabelDropdown = myPanel.add("dropdownlist", undefined, labelList);
    activeLabelDropdown.alignment = ["left", "top"];
    activeLabelDropdown.size = [clickablesWidth, clickablesHeight];

    var uiElements = [activeLabelDropdownInstruction, activeLabelDropdown];

    // _______________⏯BUTTONS, CLICKS, DROPDOWNS⏯_____________//
    activeLabelDropdown.onChange = function() {
        if (activeLabelDropdown.selection) {
            activeLabelDropdownInstruction.text = "Label selected:";
            shyLabelGroup(activeLabelDropdown.selection.index);
        } else {
            activeLabelDropdownInstruction.text = "Select a label:";
        }
    };

    return myPanel;
}

function shyLabelGroup (activeLabel) { 
    app.beginUndoGroup("Shying Layers");
    // Check if a composition is active
    if (app.project.activeItem instanceof CompItem) {
        var comp = app.project.activeItem;
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (layer.label === activeLabel) {
                layer.shy = false;
            }
            else { 
                layer.shy = true;
            }
        } 
        comp.hideShyLayers = true
    } else {
        alert("Please select an active composition.");
    }
    app.endUndoGroup();
}