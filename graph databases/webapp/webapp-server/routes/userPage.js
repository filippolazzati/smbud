//function to get basic info about an user from his Id
async function getUserInfo(userId) {
  console.log("NO");
  try {
    const result = dbsession.run(`match (n:Person {Id: "${userId}"}) return n`);

    const singleUser = result.records[0]._fields[0].properties;
    console.log("NO");
    //console.log(singleUser);
    return json(singleUser);
  } catch (error) {
    console.error(error);
    return null;
  }
}

//function to get the vaccine dose of an user by his Id
function isUserVaccinated(userId) {
  try {
    const result = dbsession.run(
      `match (n:Person {Id: "${userId}"})-[:GETS]->(v:VaccineDose) RETURN v`
    );

    const vaccineList = [];
    result.records.forEach((record) => {
      vaccineList.push(record._fields[0].properties);
    });
    return json({ vaccines: vaccineList });
  } catch (error) {
    console.error(error);
    return null;
  }
}

//function to get all the tests of an user by his Id
function getUserTest(userId) {
  try {
    const result = dbsession.run(
      `match (n:Person {Id: "${userId}"})-[:TAKES]->(t:Test) RETURN t`
    );

    const testList = [];
    result.records.forEach((record) => {
      testList.push(record._fields[0].properties);
    });
    return json({ tests: testList });
  } catch (error) {
    console.error(error);
    return null;
  }
}

//generic structure of a function that do a query
function executeQuery(query) {
  var result = [];
  console.log("Executing query: " + query);

  dbsession.run(query).subscribe({
    onNext: (record) => {
      result.push(record.get("n"));
    },
    onCompleted: function () {
      console.log("Operation completed.");
      return result;
    },
    onError: function (error) {
      console.log("Error occurred: " + error);
      return null;
    },
  });
}
