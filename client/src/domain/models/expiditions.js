// export class Expedition {
//   constructor(droneID, startTime, endTime, latitude, longitude, carbonMonoxide, methane, butane, liquefiedPetroleumGas, feedback) {
//     this.droneID = droneID;
//     this.startTime = startTime;
//     this.endTime = endTime;
//     this.location = { latitude, longitude };
//     this.gasStats = {
//       carbonMonoxide,
//       methane,
//       butane,
//       liquefiedPetroleumGas,
//     };
//     this.feedback = feedback;
//   }

//   isValid() {
//     return (
//       this.droneID &&
//       this.startTime &&
//       this.endTime &&
//       this.location.latitude &&
//       this.location.longitude
//     );
//   }

//   formatData() {
//     return {
//       droneID: this.droneID.trim(),
//       startTime: new Date(this.startTime).toISOString(),
//       endTime: new Date(this.endTime).toISOString(),
//       location: {
//         latitude: parseFloat(this.location.latitude),
//         longitude: parseFloat(this.location.longitude),
//       },
//       gasStats: {
//         carbonMonoxide: parseFloat(this.gasStats.carbonMonoxide),
//         methane: parseFloat(this.gasStats.methane),
//         butane: parseFloat(this.gasStats.butane),
//         liquefiedPetroleumGas: parseFloat(this.gasStats.liquefiedPetroleumGas),
//       },
//       feedback: this.feedback.trim(),
//     };
//   }
// }
