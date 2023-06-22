import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Navbar = ({ loadVostfr, loadVf, setShowLastEpisodes }) => {
  const handleLastEpisodesClick = () => {
    setShowLastEpisodes(true);
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarList}>
        <TouchableOpacity onPress={loadVostfr} style={styles.navbarItem}>
          <Text style={styles.navbarLink}>Anime VOSTFR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadVf} style={styles.navbarItem}>
          <Text style={styles.navbarLink}>Anime VF</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLastEpisodesClick} style={[styles.navbarItem, styles.lastNavbarItem]}>
          <Text style={styles.navbarLink}>Dernières sorties</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 9999,
  },
  navbarList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navbarItem: {
    flex: 1,
    marginRight: 16,
  },
  lastNavbarItem: {
    marginRight: 0,
  },
  navbarLink: {
    color: '#333333',
    textDecorationLine: 'none',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navbarLinkHover: {
    color: '#ff0000',
  },
});

export default Navbar;
