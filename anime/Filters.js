import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Filters = ({
  filterYear,
  filterStatus,
  filterFormat,
  availableYears,
  handleFilterByYear,
  handleFilterByStatus,
  handleFilterByFormat,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      persistentScrollbar={true}
    >
      <View style={styles.filter}>
        <View style={styles.pickerContainer}>
          <Picker style={styles.picker} selectedValue={filterYear} onValueChange={handleFilterByYear}>
            <Picker.Item label="All Years" value="" />
            {availableYears.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year.toString()} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker style={styles.picker} selectedValue={filterStatus} onValueChange={handleFilterByStatus}>
            <Picker.Item label="All Status" value="" />
            <Picker.Item label="In Progress" value="1" />
            <Picker.Item label="Completed" value="2" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker style={styles.picker} selectedValue={filterFormat} onValueChange={handleFilterByFormat}>
            <Picker.Item label="All Formats" value="" />
            <Picker.Item label="OAV" value="ova" />
            <Picker.Item label="TV" value="tv" />
            <Picker.Item label="FILM" value="m0v1e" />
            <Picker.Item label="Special" value="special" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  picker: {
    height: 40,
    width: 170
  },
});

export default Filters;
