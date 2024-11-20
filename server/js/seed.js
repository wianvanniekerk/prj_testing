import { faker } from "@faker-js/faker";
import Register from "../models/register.js";
import Drone from "../models/drone.js";
import DroneLog from "../models/droneLog.js";
import Expedition from "../models/expedition.js";
import DroneExpedition from "../models/droneExpedition.js";
import Feedback from "../models/feedback.js";
import UserDrone from "../models/userDrone.js";

// Change amounts generated here
const NUMBER_OF_USERS = 30;
const NUMBER_OF_DRONES = 10;
const NUMBER_OF_EXPEDITIONS = 15;
const NUMBER_OF_LOGS = 30;
const NUMBER_OF_FEEDBACKS = 10;

async function generateUsers(num) {
  const usersArr = [];

  for (let i = 0; i < num; i++) {
    usersArr.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      emailAddress: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }

  return usersArr;
}

async function generateDrones(num) {
  const droneArr = [];

  for (let i = 0; i < num; i++) {
    droneArr.push({
      droneNum: i,
      droneType: faker.helpers.arrayElement([
        "MQ2MetButSmo",
        "MQ4Met",
        "MQ5Nat",
        "MQ7CarMon",
        "MQ136HydSul",
      ]),
      flightHours: Math.floor(Math.random() * 101),
    });
  }

  return droneArr;
}

async function generateDroneLogs(num, droneIds) {
  const droneLogsArr = [];

  for (let i = 0; i < num; i++) {
    droneLogsArr.push({
      droneID: faker.helpers.arrayElement(droneIds), // Provide some drone IDs
      timestamp: faker.date.past(),
      gasStats: Array.from({
        length: faker.number.int({ min: 1, max: 5 }),
      }).map(() => ({
        detectionStatus: faker.helpers.arrayElement([
          "Safe",
          "Warning",
          "Dangerous",
        ]),
        detectionValue: faker.number.int({ min: 70, max: 990 }),
      })),
      route: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
        () => ({
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          altitude: faker.number.int({ min: 100, max: 1000 }),
        })
      ),
    });
  }

  return droneLogsArr;
}

async function generateExpeditions(num, droneIds) {
  const expeditionsArr = [];

  for (let i = 0; i < num; i++) {
    const startTime = faker.date.past();
    const endTime = new Date(
      startTime.getTime() +
        faker.number.int({ min: 1, max: 5 }) * 60 * 60 * 1000
    ); // Adds 1 to 5 hours to startTime

    expeditionsArr.push({
      droneID: faker.helpers.arrayElement(droneIds), // Provide some drone IDs
      startTime: startTime,
      endTime: endTime,
      location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      gasStats: {
        carbonMonoxide: faker.number.float({ min: 70, max: 990 }),
        methane: faker.number.float({ min: 70, max: 990 }),
        butane: faker.number.float({ min: 70, max: 990 }),
        liquefiedPetroleumGas: faker.number.float({ min: 70, max: 990 }),
      },
    });
  }

  return expeditionsArr;
}

async function generateDroneExpeditions(num, droneIds, expeditionIds) {
  const droneExpeditionsArr = [];

  for (let i = 0; i < num; i++) {
    droneExpeditionsArr.push({
      droneID: faker.helpers.arrayElement(droneIds), // Pick a random drone ID
      expeditionID: faker.helpers.arrayElement(expeditionIds), // Pick a random expedition ID
    });
  }

  return droneExpeditionsArr;
}

async function generateFeedbacks(num, userIds) {
  const feedbackArr = [];

  for (let i = 0; i < num; i++) {
    feedbackArr.push({
      userID: faker.helpers.arrayElement(userIds), // Provide some user IDs
      timestamp: faker.date.recent(),
      rating: faker.number.int({ min: 1, max: 5 }), // Ratings from 1 to 5
      comments: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    });
  }

  return feedbackArr;
}

async function seedUsers() {
  try {
    const users = await generateUsers(NUMBER_OF_USERS);
    const userDocs = await Register.insertMany(users);
    console.log("Users seeded successfully");
    return userDocs.map((user) => user._id);
  } catch (error) {
    console.error("Error inserting users:", error);
  }
}

async function seedDrones() {
  try {
    const drones = await generateDrones(NUMBER_OF_DRONES);
    const droneDocs = await Drone.insertMany(drones);
    console.log("Drones seeded successfully");
    return droneDocs.map((drone) => drone._id);
  } catch (error) {
    console.error("Error inserting drones:", error);
  }
}

async function seedDroneLogs(droneIds) {
  try {
    const droneLogs = await generateDroneLogs(NUMBER_OF_LOGS, droneIds);
    await DroneLog.insertMany(droneLogs);
    console.log("Drone logs seeded successfully");
  } catch (error) {
    console.error("Error inserting drone logs:", error);
  }
}

async function seedExpeditions(droneIds) {
  try {
    const expeditions = await generateExpeditions(
      NUMBER_OF_EXPEDITIONS,
      droneIds
    );
    const expeditionDocs = await Expedition.insertMany(expeditions);
    console.log("Expeditions seeded successfully");
    return expeditionDocs.map((expedition) => expedition._id);
  } catch (error) {
    console.error("Error inserting expeditions:", error);
  }
}

async function seedDroneExpeditions(droneIds, expeditionIds) {
  try {
    const droneExpeditions = await generateDroneExpeditions(
      NUMBER_OF_EXPEDITIONS,
      droneIds,
      expeditionIds
    );
    await DroneExpedition.insertMany(droneExpeditions);
    console.log("DroneExpeditions seeded successfully");
  } catch (error) {
    console.error("Error inserting drone expeditions:", error);
  }
}

async function seedFeedbacks(userIds) {
  try {
    const feedbacks = await generateFeedbacks(NUMBER_OF_FEEDBACKS, userIds);
    await Feedback.insertMany(feedbacks);
    console.log("Feedbacks seeded successfully");
  } catch (error) {
    console.error("Error inserting feedbacks:", error);
  }
}

async function generateUserDrones(userIds, droneIds) {
  const userDronesArr = [];

  for (let userId of userIds) {
    const randomDroneCount = faker.number.int({ min: 1, max: 3 });
    const associatedDrones = faker.helpers.arrayElements(
      droneIds,
      randomDroneCount
    );

    for (let droneId of associatedDrones) {
      userDronesArr.push({
        userID: userId,
        droneID: droneId,
      });
    }
  }

  return userDronesArr;
}

async function seedUserDrones(userIds, droneIds) {
  try {
    const userDrones = await generateUserDrones(userIds, droneIds);
    await UserDrone.insertMany(userDrones);
    console.log("UserDrones seeded successfully");
  } catch (error) {
    console.error("Error inserting user drones:", error);
  }
}

async function seedDatabase() {
  try {
    const userIds = await seedUsers();
    const droneIds = await seedDrones();
    const expeditionIds = await seedExpeditions(droneIds);
    await seedDroneLogs(droneIds);
    await seedDroneExpeditions(droneIds, expeditionIds);
    await seedFeedbacks(userIds);
    await seedUserDrones(userIds, droneIds);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

export default seedDatabase;
