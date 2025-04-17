function parseUplink(device, payload)
{
	// This function allows you to parse the received payload, and store the 
	// data in the respective endpoints. Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device that produced the payload. 
	//   You can use "device.endpoints" to access the collection 
	//   of endpoints contained within the device. More information
	//   at https://wiki.cloud.studio/page/205
	// - payload: object containing the payload received from the device. More
	//   information at https://wiki.cloud.studio/page/208.

	// This example is written assuming a temperature and humidity sensor that 
	// sends a binary payload with temperature in the first byte, humidity 
	// in the second byte, and battery percentage in the third byte.
    // Payload is json
    var data = payload.asJsonObject();
    env.log(data, "  payload  ", device, "device");
    if (data.Type == "data")
    {
    
        var ep = device.endpoints.byAddress("1");
        if (ep != null && data.moving != null && data.position != null)
        {
            ep.updateClosureControllerStatus(data.moving, data.position);
        }


    }

    if (data.Type == "response")
    {
        if (data.Success) 
        {
            device.respondCommand(data.CommandId, commandResponseType.success);
        }
        else 
        {
            device.respondCommand(data.CommandId, commandResponseType.error, data.ErrorMessage, data.ErrorCode);
        }
    }



}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	 payload.buildResult = downlinkBuildResult.ok; 
     env.log(command, "Command log")
	 switch (command.type) { 
	 	case commandType.closure: 
	 	 	switch (command.closure.type) { 
	 	 	 	
                case closureCommandType.open: 
	 	 	 	 	 var obj = { 
                        CommandId: command.commandId,
                        Command: "open"
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true; 	 
	 	 	 	 	 break;

	 	 	 	 case closureCommandType.close: 
	 	 	 	 	 var obj = { 
                        CommandId: command.commandId,
                        Command: "close"
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true; 	 	 
	 	 	 	 	 break;

	 	 	 	 case closureCommandType.position: 
	 	 	 	 	var obj = { 
                        CommandId: command.commandId,
                        Command: "position",
                        Position: command.closure.position
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true; 	 	 
	 	 	 	 	 break;

                 case closureCommandType.stop: 
	 	 	 	 	 var obj = { 
                        CommandId: command.commandId,
                        Command: "stop"
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true; 	 
	 	 	 	 	break;

                 case closureCommandType.openStop:
                    var obj = { 
                        CommandId: command.commandId,
                        Command: "openStop"
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true; 	 	 	  
	 	 	 	 	break;

                 case closureCommandType.closeStop:
                    var obj = { 
                        CommandId: command.commandId,
                        Command: "closeStop"
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true; 	
	 	 	 	 	break;

                default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	} 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	}


}