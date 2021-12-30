# Cassandra Instructions

- ## Create keyspace   

```
    cqlsh> CREATE KEYSPACE somministrazioni WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor':3};
```

- ## Select keyspace   

```
    cqlsh> USE somministrazioni;
```

- ## Create table   

```
    cqlsh:somministrazioni> CREATE TABLE somministrazioni (  
        data_somministrazione date,
        fornitore text,
        area text,
        fascia_anagrafica text,
        sesso_maschile varint,
        sesso_femminile varint,
        prima_dose varint,
        seconda_dose varint,
        pregressa_infezione varint,
        dose_addizionale_booster varint,
        codice_NUTS1 text,
        codice_NUTS2 text,
        codice_regione_ISTAT varint,
        PRIMARY KEY ((data_somministrazione, codice_regione_ISTAT),
        (fascia_anagrafica, fornitore))
    );
```

- ## Import data from CSV file

Remember to move to the `.csv` file directory before starting `cqlsh`.

```
cqlsh:somministrazioni> COPY somministrazioni (data_somministrazione, fornitore, area, fascia_anagrafica, sesso_maschile, sesso_femminile, prima_dose, seconda_dose, pregressa_infezione, dose_addizionale_booster, codice_NUTS1, codice_NUTS2, codice_regione_ISTAT, nome_area) FROM 'somministrazioni.csv' WITH HEADER = false;
```

- ## Create an index on `nome_area`

```
cqlsh:somministrazioni> CREATE INDEX regione ON somministrazioni (nome_area) ;
```

- ## Queries examples

    - ### Records of administrations in Liguria on date 2021-02-13

    ```
    cqlsh:somministrazioni> SELECT * FROM somministrazioni  WHERE data_somministrazione = '2021-02-13' AND nome_area = 'Liguria' ALLOW FILTERING;
    ```

    - ### Total number of doses in Liguria on date 2021-02-13

    ```
    cqlsh:somministrazioni> SELECT SUM(sesso_maschile)+SUM(sesso_femminile) AS dosi_totali FROM somministrazioni  WHERE data_somministrazione = '2021-02-13' AND nome_area = 'Liguria' ALLOW FILTERING;
    ```