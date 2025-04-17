function getEndpoints(deviceAddress, endpoints)
{
  // This function allows you to indicate the initial endpoint configuration
  // when a device is created using this model. This improves end-user 
  // experience significantly, because it allows the platform to create
  // all endpoints included in the device automatically when the device
  // is created.

  // In the code below, two endpoints are created. The first is a
  // temperature sensor, while the second one is a carbon dioxide sensor.

   var ep = endpoints.addEndpoint("1", "Curtain Controller", endpointType.curtainController);
   ep.accessType = endpointAccessType.readWriteCommand;
   ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;
}