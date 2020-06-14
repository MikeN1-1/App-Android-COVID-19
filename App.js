import React, { useEffect, useState } from 'react';
import {  ActivityIndicator, FlatList, Platform, StyleSheet, Text, View, Image } from 'react-native';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});
var date = new Date().getDate();

export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

    var dia = new Date().getDate()-1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fecha = dia + '-' + month + '-' + year

  useEffect(() => {
    fetch("https://covid-19-data.p.rapidapi.com/report/country/name?date-format=DD-MM-YYYY&format=json&date=" + fecha + "&name=mexico", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "6e4039ab57mshb44ceff6deb1b29p184c2djsn46dd205df009"
      }
    })
      .then((response) => response.json())
      .then((json) => setData(json[0].provinces))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={page.container}>
      <React.Fragment>
          <Text style={flattenStyle}>Casos de COVID-19 </Text>
          <Image
            source={{ require: 'assets/covid1.png' }}
            style={{ width: 40, height: 40 }}
          />
      </React.Fragment>
        {isLoading ? <ActivityIndicator/> : (
          <React.Fragment>
            <Text>{"Fecha: " + dia + '/' + month + '/' + year}</Text>
            <Text>{"País: " + data[0].province}</Text>
            <Text style={styles.red}>{"Confirmados: " + (data[0].confirmed ? data[0].confirmed : " Por confirmar ")}</Text>
            <Text style={styles.green}>{"Recuperados: " + (data[0].recovered ? data[0].recovered : " Por confirmar")}</Text>
            <Text style={styles.blue}>{"Muertes: " + (data[0].deaths ? data[0].deaths : " Por confirmar ")}</Text>
            <Text style={styles.orange}>{"Activos: " + (data[0].active ? data[0].active : " Por confirmar ")}</Text>
          </React.Fragment>
        )}
    </View>
  );
};
const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: '#F4F8F7',
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold"
  },
  code: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "#eaeaea"
  }
});

const typography = StyleSheet.create({
  header: {
    color: "#36D0BC",
    fontSize: 30,
    marginBottom: 36
  }
});

const flattenStyle = StyleSheet.flatten([
  page.text,
  typography.header
]);
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  orange: {
    color: 'orange',
  },
  yellow: {
    color: 'yellow',
  },
  green: {
    color: 'green',
  },
  blue: {
    color: 'blue',
  },
});


