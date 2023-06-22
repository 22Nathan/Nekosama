import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, totalPages, changePage }) => {
  const renderPaginationButtons = () => {
    const paginationButtons = [];

    if (currentPage > 1) {
      paginationButtons.push(
        <TouchableOpacity
          key="prev"
          style={styles.button}
          onPress={() => changePage(currentPage - 1)}
        >
          <Text style={styles.buttonText}>&lt;</Text>
        </TouchableOpacity>
      );
    }

    const maxPage = Math.min(totalPages, 5);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = startPage + maxPage - 1;

    for (let page = startPage; page <= endPage; page++) {
      paginationButtons.push(
        <TouchableOpacity
          key={page}
          style={[
            styles.button,
            currentPage === page ? styles.activeButton : null
          ]}
          onPress={() => changePage(page)}
        >
          <Text
            style={[
              styles.buttonText,
              currentPage === page ? styles.activeButtonText : null
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      );
    }

    if (currentPage < totalPages) {
      paginationButtons.push(
        <TouchableOpacity
          key="next"
          style={styles.button}
          onPress={() => changePage(currentPage + 1)}
        >
          <Text style={styles.buttonText}>&gt;</Text>
        </TouchableOpacity>
      );
    }

    return paginationButtons;
  };

  return <View style={styles.paginationContainer}>{renderPaginationButtons()}</View>;
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  activeButton: {
    backgroundColor: 'blue',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default Pagination;
