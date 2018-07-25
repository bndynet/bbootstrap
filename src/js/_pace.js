if (window) {
    window.paceOptions = {
        startOnPageLoad: false, // disable pace

        // set false for disable pace completely in vscode. 
        // vscode inject websocket to refresh browser immedialtely so that can not be disabled completely via above property.
        // In production envrionment, does not have this issue.
        restartOnRequestAfter: false    
    };
}
//=require pace-js/pace.min.js