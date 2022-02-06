//// -----JS CODE-----
////@input Asset.ScanModule scanModule 
// script.scanModule.scan([ScanModule.Contexts.Objects], onScanComplete, onScanFailure);
//
//function onScanComplete(returnedJSON)
//{
//   //parse returned json
//   var jsonObj = JSON.parse(returnedJSON); 
//   //get results in the returned array
//   var annotations = jsonObj["annotations"][ScanModule.Contexts.Objects]["annotations"]; 
//   //check if array has elements
//   if(annotations.length > 0)
//   {
//       for (var i = 0; i < annotations.length; i++){
//            //print out all scan results. 
//            print(annotations[i].name);
//            //print out result's confidence score aka how 'close' the scanned item is to the returned label 
//            print(annotations[i].confidence);
//       }
//   }
//}
//function onScanFailure(failedReason){
//    print("Scan Failed For: " + failedReason);
//}
//script.scanModule.scan([ScanModule.Contexts.Objects], onScanComplete, onScanFailure);
//function onScanComplete(data){
//  //code to run
//  print(data);
//  //call scan again once result is returned
//  script.scanModule.scan([ScanModule.Contexts.Objects], onScanComplete, onScanFailure);
//}
//function onScanFailure(){
//  script.scanModule.scan([ScanModule.Contexts.Objects], onScanComplete, onScanFailure);
//}
//
//function setScanResultScreen(isAccepted){
//   script.scanAcceptedObject.enabled = isAccepted;
//   script.scanDeclinedObject.enabled = !isAccepted;
//}
//
//
//function onScanFailure(failedReason){
//    print("Scan Failed For: " + failedReason);
//    // The user has declined permission to send images to Scan.
//    if(failedReason.includes("declined permission")){
//        setScanResultScreen(false);
//    }
//}
//
//function onScanComplete(){
//    setScanResultScreen(true);
//}
//