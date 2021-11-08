// Clear database
MATCH (x) DETACH DELETE x;

// Import locations
LOAD CSV WITH HEADERS FROM 'file:///locations.csv' AS row
MERGE (l:Location {Id: row.ID, Description: row.Description, Address: row.Address});
// Import people
LOAD CSV WITH HEADERS FROM 'file:///users.csv' AS row
MERGE (p:Person {Id: row.ID, Name: row.Name, Surname: row.Surname, DateOfBirth: row.DateOfBirth, HomeLocationId: row.HomeLocationId});
// Import devices
LOAD CSV WITH HEADERS FROM 'file:///devices.csv' AS row
MERGE (d:Device {PersonId: row.PersonId, Name: row.Name});
// Import tests
LOAD CSV WITH HEADERS FROM 'file:///test.csv' AS row
MERGE (t:Test {PersonId: row.PersonId, Time: datetime({epochSeconds: toInteger(row.Time)}), Result: row.Result});
// Import vaccines
LOAD CSV WITH HEADERS FROM 'file:///vaccines.csv' AS row
MERGE (v:VaccineDose {PersonId: row.PersonId, Date: datetime({epochSeconds: toInteger(row.Date)}), Type: row.Type});

// Import contacts
LOAD CSV WITH HEADERS FROM 'file:///contacts.csv' AS row
MATCH (p: Person), (q: Person)
WHERE p.Id <> q.Id AND p.Id = row.Person1Id AND q.Id = row.Person2Id
CREATE (p)-[r:CONTACT {StartTime: datetime({epochSeconds: toInteger(row.StartTime)}), EndTime: datetime({epochSeconds: toInteger(row.EndTime)})}]->(q);

// Import user locations
LOAD CSV WITH HEADERS FROM 'file:///userlocations.csv' AS row
MATCH (p: Person), (l: Location)
WHERE p.Id=row.PersonId AND l.Id=row.LocationId
CREATE (p)-[:VISITED {StartTime: datetime({epochSeconds: toInteger(row.StartTime)}), EndTime: datetime({epochSeconds: toInteger(row.EndTime)})}]->(l);

// Create person "lives in" relation
MATCH (p:Person), (l:Location)
WHERE p.HomeLocationId=l.Id
CREATE (p)-[r:LIVES_IN]->(l);

// Create person->device relation
MATCH (p:Person), (d:Device)
WHERE d.PersonId=p.Id
CREATE (p)-[r:OWNS]->(d);

// Create person->test relation
MATCH (p:Person), (t:Test)
WHERE t.PersonId=p.Id
CREATE (p)-[r:TAKES]->(t);

// Create person->vaccine relation
MATCH (v:VaccineDose), (p:Person)
WHERE v.PersonId=p.Id
CREATE (p)-[r:GETS]->(v);

//Remove the HomeLocationId and Id in Person and the PersonId in the other nodes
MATCH(p:Person)
REMOVE p.HomeLocationId;

MATCH(t:Test)
REMOVE t.PersonId;

MATCH(v:VaccineDose)
REMOVE v.PersonId;

MATCH(d:Device)
REMOVE d.PersonId;

MATCH(p:Person)
REMOVE p.Id;

MATCH(l:Location)
REMOVE l.Id;